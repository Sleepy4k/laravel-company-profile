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
            'id' => $this->id,
            'uuid' => $this->uuid,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),

            $this->mergeWhen($this->roles->isNotEmpty(), [
                'role' => $this->roles->first()?->name ?? null,
                'permissions' => $this->roles->flatMap(function ($role) {
                    return $role->permissions->map(function ($permission) {
                        return $permission->name;
                    });
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
