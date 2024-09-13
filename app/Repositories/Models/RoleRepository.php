<?php

namespace App\Repositories\Models;

use App\Models\Role;
use App\Traits\SystemLog;
use App\Enum\ReportLogType;
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
     * @return Model
     */
    public function create(array $payload): ?Model
    {
        try {
            if (array_key_exists('permission', $payload)) {
                $permission = $payload['permission'];
                unset($payload['permission']);
            }

            $model = $this->model->create($payload);

            if (!empty($permission)) $model->syncPermissions($permission);

            return $model->fresh();
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }

    /**
     * Update existing model.
     *
     * @param  int  $modelId
     * @param  array  $payload
     * @return Model
     */
    public function update(int $modelId, array $payload): bool
    {
        try {
            if (array_key_exists('permission', $payload)) {
                $permission = $payload['permission'];
                unset($payload['permission']);
            }

            $model = $this->findById($modelId);

            if (!empty($permission)) $model->syncPermissions($permission);

            return $model->update($payload);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }
}
