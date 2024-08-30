<?php

namespace App\Http\Controllers;

use App\Models\ApplicationSetting;
use App\Http\Requests\StoreApplicationSettingRequest;
use App\Http\Requests\UpdateApplicationSettingRequest;

class ApplicationSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicationSettingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ApplicationSetting $applicationSetting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ApplicationSetting $applicationSetting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicationSettingRequest $request, ApplicationSetting $applicationSetting)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApplicationSetting $applicationSetting)
    {
        //
    }
}
