<?php

namespace App\Repositories\Models;

use App\Models\Role;
use App\Traits\SystemLog;
use App\Contracts\Models\RoleInterface;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\EloquentRepository;

class RoleRepository extends EloquentRepository implements RoleInterface
{
    use SystemLog;

    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(Role $model)
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
        $transaction = $this->wrapIntoTransaction(function () use ($payload) {
            if (array_key_exists('permissions', $payload)) {
                $permission = $payload['permissions'];
                unset($payload['permissions']);
            }

            $model = $this->model->query()->create($payload);

            if (!empty($permission)) $model->syncPermissions($permission);

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
        $transaction = $this->wrapIntoTransaction(function () use ($modelId, $payload) {
            if (array_key_exists('permissions', $payload)) {
                $permission = $payload['permissions'];
                unset($payload['permissions']);
            }

            $model = $this->findById($modelId);

            if (!empty($permission)) $model->syncPermissions($permission);

            return $model->update($payload);
        });

        return $transaction;
    }

    /**
     * Delete model by id.
     *
     * @param  int  $modelId
     * @return Model
     */
    public function deleteById(int $modelId): bool
    {
        $transaction = $this->wrapIntoTransaction(function () use ($modelId) {
            $roleId = $this->model->query()->findOrFail($modelId);
            $roleId->users()->update(['role_id' => config('permission.role.default')]);

            return $roleId->delete();
        });

        return $transaction;
    }
}
