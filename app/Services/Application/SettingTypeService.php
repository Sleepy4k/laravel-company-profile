<?php

namespace App\Services\Application;

use App\Services\Service;

class SettingTypeService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $search = request()->get('search') ?: [];
        $sort_type = request()->get('sort_direction');
        $sort_field = request()->get('sort_field') ?: 'created_at';

        isset($search) && !empty($search) ? $search = [['name', 'like', $search], ['description', 'like', $search]] : $search = [];

        if ($sort_field && isset($sort_type)) {
            $data = $this->applicationSettingTypeInterface->paginate(10, ['*'], [], $search, $sort_field, $sort_type === 'desc' ? true : false);
        } else {
            $data = $this->applicationSettingTypeInterface->paginate(10, ['*'], [], $search);
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
        try {
            $this->applicationSettingTypeInterface->create($request);
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
        $data = $this->applicationSettingTypeInterface->findById($id);

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
        $setting = $this->applicationSettingTypeInterface->findById($id);

        return compact('setting');
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
            $this->applicationSettingTypeInterface->update($id, $request);
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
            $this->applicationSettingTypeInterface->deleteById($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
