<?php

namespace App\Http\Controllers\Log;

use Inertia\Inertia;
use App\Policies\Log\AuthPolicy;
use App\Services\Log\AuthService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Spatie\Activitylog\Models\Activity;

class AuthController extends Controller
{
    /**
     * @var AuthService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(AuthService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', AuthPolicy::class);

        try {
            session()->put('log.auth.url', request()->fullUrl());

            return Inertia::render('Log/Auth/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $auth)
    {
        Gate::authorize('view', AuthPolicy::class);

        try {
            return Inertia::render('Log/Auth/Show', $this->service->show($auth));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
