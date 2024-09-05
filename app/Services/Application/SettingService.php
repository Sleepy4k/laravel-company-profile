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
                        'key' => $setting->key,
                        'name' => $setting->display,
                        'description' => $setting->description,
                        'value' => $setting->value,
                        'updated_at' => $setting->updated_at ? $setting->updated_at->diffForHumans() : now()->diffForHumans(),
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
        case 'table':
            $search = request()->get('search') ?? [];
            $sort_type = request()->get('sort_direction');
            $sort_field = request()->get('sort_field') ?? 'created_at';

            isset($search) && !empty($search) ? $search = [['key', 'like', $search], ['display', 'like', $search], ['value', 'like', $search], ['description', 'like', $search]] : $search = [];

            if ($sort_field && isset($sort_type)) {
                $data = $this->applicationSettingInterface->paginate(10, ['*'], ['type'], $search, $sort_field, $sort_type === 'desc' ? true : false);
            } else {
                $data = $this->applicationSettingInterface->paginate(10, ['*'], ['type'], $search);
            }

            break;
        default:
            $data = $this->applicationSettingInterface->paginate(10, ['*'], ['type']);
            break;
        }

        $queryParams = request()->query() ?: null;

        return compact('data', 'queryParams');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return array
     */
    public function create(): array
    {
        $type = $this->applicationSettingTypeInterface->all(['id', 'name']);

        return compact('type');
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
        try {
            $this->applicationSettingInterface->create($request);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function show(int $id): array
    {
        $data = $this->applicationSettingInterface->findById($id, ['*'], ['type']);

        return compact('data');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function edit(int $id): array
    {
        $type = $this->applicationSettingTypeInterface->all(['id', 'name']);
        $setting = $this->applicationSettingInterface->findById($id, ['*'], ['type']);

        return compact('type', 'setting');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param array $request
     * @param int $id
     *
     * @return void
     */
    public function update(array $request, int $id): void
    {
        try {
            $this->applicationSettingInterface->update($id, $request);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return void
     */
    public function destroy(int $id): void
    {
        try {
            $this->applicationSettingInterface->deleteById($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
