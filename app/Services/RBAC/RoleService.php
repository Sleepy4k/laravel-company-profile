<?php

namespace App\Services\RBAC;

use App\Models\Role;
use App\Services\Service;
use App\DataTables\RBAC\RoleDataTable;
use App\Http\Resources\RBAC\PermissionResource;

class RoleService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new RoleDataTable($this->roleInterface);
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
        $permissions = $this->getPermissions();
        $backUrl = session()->get('rbac.permission.url') ?? route('rbac.permissions.index');

        return compact('permissions', 'backUrl');
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
            $this->roleInterface->create($request);
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
    public function show(Role $role): array
    {
        $data = $role->load('permissions');
        $permissions = $this->getPermissions();
        $backUrl = session()->get('rbac.role.url') ?? route('rbac.roles.index');

        return compact('data', 'permissions', 'backUrl');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function edit(Role $role): array
    {
        $role->load('permissions');
        $permissions = $this->getPermissions();
        $backUrl = session()->get('rbac.role.url') ?? route('rbac.roles.index');

        return compact('role', 'permissions', 'backUrl');
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
            $this->roleInterface->update($id, $request);
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
            $this->roleInterface->deleteById($id);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    /**
     * Get permissions.
     *
     * @return array
     */
    protected function getPermissions(): array
    {
        $permissions = $this->permissionInterface->all();
        $filteredPermissions = collect($permissions)->reduce(function ($result, object $item) {
            $result[explode('.', $item->name)[0]][] = new PermissionResource($item);
            return $result;
        }, []);

        return array_map(function ($group, $item) {
            return [
                'group' => $group,
                'permissions' => $item,
            ];
        }, array_keys($filteredPermissions), $filteredPermissions);
    }
}
