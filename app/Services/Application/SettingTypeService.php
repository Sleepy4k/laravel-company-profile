<?php

namespace App\Services\Application;

use App\Services\Service;
use App\Enum\SettingTypeCategory;
use App\DataTables\Application\SettingTypeDataTable;

class SettingTypeService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new SettingTypeDataTable($this->applicationSettingTypeInterface);
        $data = $dataTable->getData();
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
        $categories = SettingTypeCategory::toArray();

        return compact('categories');
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
            $request['category'] = SettingTypeCategory::fromValue($request['category'])->value;

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
        $categories = SettingTypeCategory::toArray();
        $setting = $this->applicationSettingTypeInterface->findById($id);

        return compact('setting', 'categories');
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
