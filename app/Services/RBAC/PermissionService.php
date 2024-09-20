<?php

namespace App\Services\RBAC;

use App\Services\Service;
use App\Models\Permission;
use App\DataTables\RBAC\PermissionDataTable;

class PermissionService extends Service
{
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
        $backUrl = session()->get('rbac.permission.url') ?? route('rbac.permissions.index');

        return compact('backUrl');
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
        $backUrl = session()->get('rbac.permission.url') ?? route('rbac.permissions.index');

        return compact('permission', 'backUrl');
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
            $this->permissionInterface->update($id, $request);
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
            $this->permissionInterface->deleteById($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
