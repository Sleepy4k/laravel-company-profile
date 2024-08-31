<?php

namespace App\Http\Controllers\Application;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Models\ApplicationSettingType;
use App\Http\Requests\Application\StoreSettingTypeRequest;
use App\Http\Requests\Application\UpdateSettingTypeRequest;

class SettingTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', ApplicationSettingType::class);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', ApplicationSettingType::class);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingTypeRequest $request)
    {
        Gate::authorize('create', ApplicationSettingType::class);
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('view', $applicationSettingType);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('update', $applicationSettingType);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingTypeRequest $request, ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('update', $applicationSettingType);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSettingType $applicationSettingType)
    {
        Gate::authorize('delete', $applicationSettingType);
    }
}
