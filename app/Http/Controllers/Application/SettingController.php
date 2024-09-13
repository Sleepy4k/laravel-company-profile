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
        Gate::authorize('viewAny', [ApplicationSetting::class, $mode]);

        try {
            session()->put('application.setting.url', request()->fullUrl());

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

            return session()->has('application.setting.url')
                ? redirect(session()->get('application.setting.url'))
                : to_route('application.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSetting $setting)
    {
        Gate::authorize('view', $setting);

        try {
            return Inertia::render('Application/Setting/Show', $this->service->show($setting->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSetting $setting)
    {
        Gate::authorize('edit', $setting);

        try {
            return Inertia::render('Application/Setting/Edit', $this->service->edit($setting->id));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, ApplicationSetting $setting)
    {
        Gate::authorize('update', $setting);

        try {
            $this->service->update($request->validated(), $setting->id);

            return session()->has('application.setting.url')
                ? redirect(session()->get('application.setting.url'))
                : to_route('application.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSetting $setting)
    {
        Gate::authorize('delete', $setting);

        try {
            $this->service->destroy($setting->id);

            return session()->has('application.setting.url')
                ? redirect(session()->get('application.setting.url'))
                : to_route('application.index', 'table');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
