<?php

namespace App\Repositories\Models;

use App\Models\User;
use App\Traits\SystemLog;
use App\Contracts\Models\UserInterface;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\EloquentRepository;

class UserRepository extends EloquentRepository implements UserInterface
{
    use SystemLog;

    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    /**
     * Create a model.
     *
     * @param  array  $payload
     * @return Model|bool
     */
    public function create(array $payload): Model|bool
    {
        $role = null;
        $permissions = [];

        if (array_key_exists('role', $payload)) {
            $role = $payload['role'];
            unset($payload['role']);
        }

        if (array_key_exists('permissions', $payload)) {
            $permissions = $payload['permissions'];
            unset($payload['permissions']);
        }

        $transaction = $this->wrapIntoTransaction(function () use ($payload, $role, $permissions) {
            $model = $this->model->query()->create($payload);

            !empty($role) ? $model->assignRole($role) : $model->assignRole(config('permission.role.default'));

            !empty($permissions) && $model->syncPermissions($permissions);

            return $model->fresh();
        });

        return $transaction;
    }

    /**
     * Update existing model.
     *
     * @param  int  $modelId
     * @param  array  $payload
     * @return bool
     */
    public function update(int $modelId, array $payload): bool
    {
        $role = null;
        $permissions = [];

        if (array_key_exists('role', $payload)) {
            $role = $payload['role'];
            unset($payload['role']);
        }

        if (array_key_exists('permissions', $payload)) {
            $permissions = $payload['permissions'];
            unset($payload['permissions']);
        }

        $transaction = $this->wrapIntoTransaction(function () use ($modelId, $payload, $role, $permissions) {
            $model = $this->findById($modelId);

            if (!empty($role)) $model->syncRoles($role);

            !empty($permissions) && $model->syncPermissions($permissions);

            return $model->update($payload);
        });

        return $transaction;
    }
}
