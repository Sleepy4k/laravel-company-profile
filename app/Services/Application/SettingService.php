<?php

namespace App\Services\Application;

use App\Services\Service;

class SettingService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(string $type): array
    {
        // if request had key 'type' with value 'box' or 'table'
        // then return the data in the format of box or table
        $data = null;

        switch ($type) {
        case 'box':
            $data = $this->applicationSettingTypeInterface->all(['*'], ['settings']);

            // Map the data to each setting type
            $data = $data->map(function ($settingType) {
                $settingType->settings = $settingType->settings->map(function ($setting) {
                    return [
                        'id' => $setting->id,
                        'name' => $setting->display,
                        'value' => $setting->value,
                    ];
                });

                return [
                    'id' => $settingType->id,
                    'name' => $settingType->name,
                    'description' => $settingType->description,
                    'settings' => $settingType->settings,
                ];
            });

            break;
        default:
            $data = $this->applicationSettingInterface->paginate(10, ['*'], ['type']);
            break;
        }

        return compact('data');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return array
     */
    public function create(): array
    {
        return [];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param array $request
     *
     * @return void
     */
    public function store(array $request): void
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param string $id
     *
     * @return array
     */
    public function show(string $id): array
    {
        return [];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param string $id
     *
     * @return array
     */
    public function edit(string $id): array
    {
        return [];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param array $request
     * @param string $id
     *
     * @return void
     */
    public function update(array $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param string $id
     *
     * @return void
     */
    public function destroy(string $id): void
    {
        //
    }
}
