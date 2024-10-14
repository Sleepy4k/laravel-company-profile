<?php

namespace App\Traits;

use App\Http\Resources\RBAC\PermissionResource;

trait PermissionData
{
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
