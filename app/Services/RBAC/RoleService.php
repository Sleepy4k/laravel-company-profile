<?php

namespace App\Services\RBAC;

use App\Models\Role;
use App\Services\Service;
use App\Traits\GuardNameData;
use App\DataTables\RBAC\RoleDataTable;
use App\Http\Resources\RBAC\PermissionResource;

class RoleService extends Service
{
    use GuardNameData;

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
        $guardList = $this->getGuardNameList();
        $permissions = $this->getPermissions();
        $defaultGuard = $this->getDefaultGuardName();
        $backUrl = session()->get('rbac.role.url') ?? route('rbac.roles.index');

        return compact('guardList', 'defaultGuard', 'permissions', 'backUrl');
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
        $guardList = $this->getGuardNameList();
        $permissions = $this->getPermissions();
        $backUrl = session()->get('rbac.role.url') ?? route('rbac.roles.index');

        return compact('role', 'guardList', 'permissions', 'backUrl');
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
            $isSuccess = $this->roleInterface->update($id, $request);

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
            $isSuccess = $this->roleInterface->deleteById($id);

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
