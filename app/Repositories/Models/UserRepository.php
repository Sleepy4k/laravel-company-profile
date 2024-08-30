<?php

namespace App\Repositories\Models;

use App\Models\User;
use App\Trait\SystemLog;
use App\Enum\ReportLogType;
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
     * @return Model
     */
    public function create(array $payload): ?Model
    {
        try {
            $role = null;

            if (array_key_exists('role', $payload)) {
                $role = $payload['role'];
                unset($payload['role']);
            }

            $model = $this->model->create($payload);

            !empty($role) ? $model->assignRole($role) : $model->assignRole(config('permission.role.default'));

            return $model;
        } catch (\Throwable $th) {
            // If the user already created, delete the user
            $user = $this->findByCustomId(['email' => $payload['email']], ['id']);
            if ($user) $user->delete();

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
            if (array_key_exists('role', $payload)) {
                $role = $payload['role'];
                unset($payload['role']);
            }

            $model = $this->findById($modelId);

            if (!empty($role)) $model->syncRoles($role);

            return $model->update($payload);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }
}
