<?php

namespace App\Http\Controllers\Application;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Models\ApplicationSettingType;
use App\Services\Application\SettingTypeService;
use App\Http\Requests\Application\StoreSettingTypeRequest;
use App\Http\Requests\Application\UpdateSettingTypeRequest;

class SettingTypeController extends Controller
{
    /**
     * @var SettingService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(SettingTypeService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', ApplicationSettingType::class);

        try {
            return Inertia::render('Application/Type/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', ApplicationSettingType::class);

        try {
            return Inertia::render('Application/Type/Create', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingTypeRequest $request)
    {
        Gate::authorize('store', ApplicationSettingType::class);

        try {
            $this->service->store($request->validated());

            return to_route('application.type.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('view', $applicationSettingType);

        try {
            return Inertia::render('Application/Type/Show', $this->service->show($applicationSettingType->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('update', $applicationSettingType);

        try {
            return Inertia::render('Application/Type/Edit', $this->service->edit($applicationSettingType->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingTypeRequest $request, ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('update', $applicationSettingType);

        try {
            $this->service->update($request->validated(), $applicationSettingType->id);

            return to_route('application.type.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('delete', $applicationSettingType);

        try {
            $this->service->destroy($applicationSettingType->id);

            return to_route('application.type.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
