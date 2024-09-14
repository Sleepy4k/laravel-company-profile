<?php

namespace App\Http\Controllers\Application;

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
            session()->put('application.setting.type.url', request()->fullUrl());

            return inertia('Application/Type/Home', $this->service->index());
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
            return inertia('Application/Type/Create', $this->service->create());
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

            return session()->has('application.setting.type.url')
                ? redirect(session()->get('application.setting.type.url'))
                : to_route('application.type.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSettingType $type)
    {
        Gate::authorize('view', $type);

        try {
            return inertia('Application/Type/Show', $this->service->show($type->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSettingType $type)
    {
        Gate::authorize('update', $type);

        try {
            return inertia('Application/Type/Edit', $this->service->edit($type->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingTypeRequest $request, ApplicationSettingType $type)
    {
        Gate::authorize('update', $type);

        try {
            $this->service->update($request->validated(), $type->id);

            return session()->has('application.setting.type.url')
                ? redirect(session()->get('application.setting.type.url'))
                : to_route('application.type.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSettingType $type)
    {
        Gate::authorize('delete', $type);

        try {
            $this->service->destroy($type->id);

            return session()->has('application.setting.type.url')
                ? redirect(session()->get('application.setting.type.url'))
                : to_route('application.type.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
