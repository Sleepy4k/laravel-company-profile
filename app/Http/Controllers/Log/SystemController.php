<?php

namespace App\Http\Controllers\Log;

use Inertia\Inertia;
use App\Policies\Log\SystemPolicy;
use App\Services\Log\SystemService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class SystemController extends Controller
{
    /**
     * @var AuthService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(SystemService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', SystemPolicy::class);

        try {
            session()->put('log.system.url', request()->fullUrl());

            return Inertia::render('Log/System/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        Gate::authorize('view', [SystemPolicy::class, $name]);

        try {
            return Inertia::render('Log/System/Show', $this->service->show($name));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
