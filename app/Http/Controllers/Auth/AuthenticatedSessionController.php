<?php

namespace App\Http\Controllers\Auth;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\RateLimiter;
use App\Services\Auth\AuthenticatedSessionService;

class AuthenticatedSessionController extends Controller
{
    /**
     * @var AuthenticatedSessionService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(AuthenticatedSessionService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the login view.
     */
    public function create(): Response|RedirectResponse
    {
        try {
            return inertia('Auth/Login', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // If the user has too many login attempts, we will lock the user out
        if (RateLimiter::remaining('login'.request()->ip(), config('auth.defaults.max_attempts'))) {
            RateLimiter::increment('login'.request()->ip());
        } else {
            return back()->withErrors(['email' => 'Too many login attempts. Please try again later.']);
        }

        try {
            $request->authenticate();
            $request->session()->regenerate();

            $this->service->store($request->validated());

            return redirect()->intended(route('dashboard.index', absolute: false));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        try {
            $this->service->destroy();

            $session = $request->session();
            $session->invalidate();
            $session->regenerateToken();

            return redirect('/');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
