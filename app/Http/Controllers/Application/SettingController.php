<?php

namespace App\Http\Controllers\Application;

use Inertia\Inertia;
use App\Models\ApplicationSetting;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Services\Application\SettingService;
use App\Http\Requests\Application\StoreSettingRequest;
use App\Http\Requests\Application\UpdateSettingRequest;

class SettingController extends Controller
{
    /**
     * @var SettingService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(SettingService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(string $mode)
    {
        Gate::authorize('viewAny', ApplicationSetting::class);

        try {
            return Inertia::render('Application/Setting/Home', $this->service->index($mode));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', ApplicationSetting::class);

        try {
            return Inertia::render('Application/Setting/Create', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingRequest $request)
    {
        Gate::authorize('store', ApplicationSetting::class);

        try {
            $this->service->store($request->validated());

            return to_route('application.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSetting $applicationSetting)
    {
        Gate::authorize('view', $applicationSetting);

        try {
            return Inertia::render('Application/Setting/Show', $this->service->show($applicationSetting->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSetting $applicationSetting)
    {
        Gate::authorize('edit', $applicationSetting);

        try {
            return Inertia::render('Application/Setting/Edit', $this->service->edit($applicationSetting->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, ApplicationSetting $applicationSetting)
    {
        Gate::authorize('update', $applicationSetting);

        try {
            $this->service->update($request->validated(), $applicationSetting->id);

            return to_route('application.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSetting $applicationSetting)
    {
        Gate::authorize('delete', $applicationSetting);

        try {
            $this->service->destroy($applicationSetting->id);

            return to_route('application.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
