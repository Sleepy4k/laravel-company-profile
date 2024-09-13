<?php

namespace App\Http\Controllers\Log;

use Inertia\Inertia;
use App\Policies\Log\QueryPolicy;
use App\Services\Log\QueryService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class QueryController extends Controller
{
    /**
     * @var QueryService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(QueryService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', QueryPolicy::class);

        try {
            session()->put('log.query.url', request()->fullUrl());

            return Inertia::render('Log/Query/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        Gate::authorize('view', [QueryPolicy::class, $name]);

        try {
            return Inertia::render('Log/Query/Show', $this->service->show($name));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
