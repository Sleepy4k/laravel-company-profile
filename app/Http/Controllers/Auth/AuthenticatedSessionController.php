<?php

namespace App\Http\Controllers\Auth;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\LoginRequest;
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
    public function create(): Response
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
