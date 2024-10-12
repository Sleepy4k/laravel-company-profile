<?php

namespace App\Services\RBAC;

use App\Services\Service;
use App\Models\Permission;
use App\Traits\GuardNameData;
use App\DataTables\RBAC\PermissionDataTable;

class PermissionService extends Service
{
    use GuardNameData;

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new PermissionDataTable($this->permissionInterface);
        $data = $dataTable->getData(10);
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
        $guardList = $this->getGuardNameList();
        $defaultGuard = $this->getDefaultGuardName();
        $backUrl = session()->get('rbac.permission.url') ?? route('rbac.permissions.index');

        return compact('guardList', 'defaultGuard', 'backUrl');
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
            $this->permissionInterface->create($request);

            session()->flash('success', 'Data has been created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to create.');

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
    public function show(Permission $permission): array
    {
        $data = $permission;
        $backUrl = session()->get('rbac.permission.url') ?? route('rbac.permissions.index');

        return compact('data', 'backUrl');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function edit(Permission $permission): array
    {
        $guardList = $this->getGuardNameList();
        $backUrl = session()->get('rbac.permission.url') ?? route('rbac.permissions.index');

        return compact('permission', 'guardList', 'backUrl');
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
            $isSuccess = $this->permissionInterface->update($id, $request);

            if (!$isSuccess) {
                session()->flash('error', 'Something went wrong, when try to updating data');
                return;
            }

            session()->flash('success', 'Data has been updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to update.');

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
            $isSuccess = $this->permissionInterface->deleteById($id);

            if (!$isSuccess) {
                session()->flash('error', 'Something went wrong, when try to deleting data');
                return;
            }

            session()->flash('success', 'Data has been deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to delete.');

            throw $th;
        }
    }
}
