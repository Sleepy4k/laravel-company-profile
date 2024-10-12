<?php

namespace App\Http\Controllers\Log;

use App\Policies\Log\ModelPolicy;
use App\Services\Log\ModelService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Spatie\Activitylog\Models\Activity;

class ModelController extends Controller
{
    /**
     * @var ModelService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(ModelService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', ModelPolicy::class);

        try {
            session()->put('log.model.url', request()->fullUrl());

            return inertia('Log/Model/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Activity $model)
    {
        Gate::authorize('view', [ModelPolicy::class, $model]);

        try {
            return inertia('Log/Model/Show', $this->service->show($model));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
