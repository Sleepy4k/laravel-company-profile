<?php

namespace App\Http\Controllers\Application;

use App\Models\ApplicationSetting;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\Application\StoreSettingRequest;
use App\Http\Requests\Application\UpdateSettingRequest;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', ApplicationSetting::class);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', ApplicationSetting::class);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingRequest $request)
    {
        Gate::authorize('create', ApplicationSetting::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSetting $applicationSetting)
    {
        Gate::authorize('view', $applicationSetting);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSetting $applicationSetting)
    {
        Gate::authorize('update', $applicationSetting);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingRequest $request, ApplicationSetting $applicationSetting)
    {
        Gate::authorize('update', $applicationSetting);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSetting $applicationSetting)
    {
        Gate::authorize('delete', $applicationSetting);
    }
}