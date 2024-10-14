<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthInertiaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'email' => $this->email,

            $this->mergeWhen($this->roles->isNotEmpty(), [
                'role' => $this->roles->first()?->name ?? null,
                'permissions' => $this->roles->flatMap(function ($role) {
                    $permissions = $role->permissions->map(function ($permission) {
                        return $permission->name;
                    });

                    if ($this->permissions) {
                        return $permissions->merge($this->permissions->pluck('name'));
                    }

                    return $permissions;
                }),
            ]),

            // Handle empty roles and permissions when user does not have any
            $this->mergeWhen($this->roles->isEmpty(), [
                'role' => null,
                'permissions' => [],
            ]),
        ];
    }
}
