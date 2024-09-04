<?php

namespace App\Repositories\Models;

use App\Traits\SystemLog;
use App\Traits\AppSetting;
use App\Enum\ReportLogType;
use App\Models\ApplicationSetting;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\EloquentRepository;
use Illuminate\Database\Eloquent\Collection;
use App\Contracts\Models\ApplicationSettingInterface;

class ApplicationSettingRepository extends EloquentRepository implements ApplicationSettingInterface
{
    use SystemLog, AppSetting;

    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(ApplicationSetting $model)
    {
        $this->model = $model;
    }

    /**
     * Get all models.
     *
     * @param  array  $columns
     * @param  array  $relations
     * @param  array  $wheres
     * @param  string  $orderBy
     * @param  bool  $latest
     * @param  array  $roles
     * @return Collection
     */
    public function all(array $columns = ['*'], array $relations = [], array $wheres = [], string $orderBy = 'created_at', bool $latest = true, array $roles = []): Collection
    {
        try {
            $settings = $this->getAppSettings();

            if (!$settings) return collect();

            return collect($settings);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }

    /**
     * Get all models.
     *
     * @param  array  $columns
     * @param  bool  $first
     * @param  array  $relations
     * @param  array  $wheres
     * @param  string  $orderBy
     * @param  bool  $latest
     * @param  array  $roles
     * @return Collection|Model
     */
    public function get(array $columns = ['*'], bool $first, array $relations = [], array $wheres = [], string $orderBy = 'created_at', bool $latest = true, array $roles = []): Collection|Model
    {
        try {
            $settings = $this->getAppSettings();

            if (!$settings) return collect();

            return collect($settings);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
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
            $model = $this->model->query()->create($payload);

            if ($this->isAppSettingCached()) {
                cache()->forget('app_settings');
                $this->getAppSettings();
            }

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
            $model = $this->findById($modelId);

            return $this->updateAppSetting($model->key, $payload);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }

    /**
     * Delete model by id.
     *
     * @param  int  $modelId
     * @return Model
     */
    public function deleteById(int $modelId): bool
    {
        try {
            $result = $this->findById($modelId)->delete();

            if ($this->isAppSettingCached()) {
                cache()->forget('app_settings');
                $this->getAppSettings();
            }

            return $result;
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }
}
