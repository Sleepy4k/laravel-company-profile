<?php

namespace App\Services\Application;

use App\Services\Service;
use App\Enum\DisplayModeType;
use Illuminate\Support\Facades\Storage;
use App\DataTables\Application\SettingDataTable;
use App\Http\Resources\Application\SettingTypeBoxResource;

class SettingService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(string $type): array
    {
        // Convert the string to DisplayModeType enum
        $type = DisplayModeType::fromValue($type);

        try {
            // if request had key 'type' with value 'box' or 'table'
            // then return the data in the format of box or table
            $data = null;

            // Set the data table if the type is not box
            if ($type !== DisplayModeType::BOX) {
                $dataTable = new SettingDataTable($this->applicationSettingInterface);
            }

            switch ($type) {
            case DisplayModeType::BOX:
                $data = $this->applicationSettingTypeInterface->all(['*'], ['settings']);
                $data = SettingTypeBoxResource::collection($data);
                break;
            case DisplayModeType::TABLE:
                $data = $dataTable->getData(10, ['*'], ['type']);
                break;
            default:
                $data = $dataTable->getData(10, ['*'], ['type']);
                break;
            }

            $queryParams = request()->query() ?: null;

            return compact('data', 'queryParams');
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return array
     */
    public function create(): array
    {
        $types = $this->applicationSettingTypeInterface->all(['id', 'name', 'category']);
        $backUrl = session()->get('application.setting.url') ?? route('application.index', ['table']);

        return compact('types', 'backUrl');
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
            // Remove the file if there is an error
            if (isset($filePath)) {
                Storage::disk('public')->delete($filePath);
            }

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
        $backUrl = session()->get('application.setting.url') ?? route('application.index', ['table']);

        return compact('data', 'backUrl');
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
        $types = $this->applicationSettingTypeInterface->all(['id', 'name', 'category']);
        $setting = $this->applicationSettingInterface->findById($id, ['*'], ['type']);
        $backUrl = session()->get('application.setting.url') ?? route('application.index', ['table']);

        return compact('types', 'setting', 'backUrl');
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
