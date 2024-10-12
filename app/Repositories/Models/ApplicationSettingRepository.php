<?php

namespace App\Repositories\Models;

use App\Traits\SystemLog;
use App\Traits\AppSetting;
use App\Traits\UploadFile;
use App\Enum\UploadFileType;
use App\Models\ApplicationSetting;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\EloquentRepository;
use App\Contracts\Models\ApplicationSettingInterface;

class ApplicationSettingRepository extends EloquentRepository implements ApplicationSettingInterface
{
    use SystemLog, AppSetting, UploadFile;

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
     * Create a model.
     *
     * @param  array  $payload
     * @return Model
     */
    public function create(array $payload): Model|bool
    {
        if (array_key_exists('file', $payload)) {
            $payload['value'] = $this->saveSingleFile(UploadFileType::IMAGE, $payload['file']);
            unset($payload['file']);
        }

        $transaction = $this->wrapIntoTransaction(function () use ($payload) {
            $model = $this->model->query()->create($payload);
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
            $model = $this->findById($modelId, ['*'], ['type']);

            if (array_key_exists('file', $payload) && !empty($payload['file']) && $model->type->category == 'file') {
                if (empty($model->value)) {
                    $payload['value'] = $this->saveSingleFile(UploadFileType::IMAGE, $payload['file']);
                } elseif (!empty($model->value) && $payload['file'] !== $model->value) {
                    $payload['value'] = $this->updateSingleFile(UploadFileType::IMAGE, $payload['file'], $model->value);
                }

                unset($payload['file']);
            }

            return $model->update($payload);
        });

        return $transaction;
    }

    /**
     * Delete model by id.
     *
     * @param  int  $modelId
     * @return bool
     */
    public function deleteById(int $modelId): bool
    {
        $transaction = $this->wrapIntoTransaction(function () use ($modelId) {
            $model = $this->findById($modelId, ['*'], ['type']);

            if (isset($model->value) && !empty($model->value) && $model->type->category == 'file') {
                $this->deleteFile(UploadFileType::IMAGE, $model->value);
            }

            return $model->delete();
        });

        return $transaction;
    }
}
