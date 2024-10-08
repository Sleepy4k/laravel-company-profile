<?php

namespace App\Repositories\Models;

use App\Models\Translate;
use App\Traits\SystemLog;
use App\Enum\ReportLogType;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\EloquentRepository;
use App\Contracts\Models\LanguageInterface;

class LanguageRepository extends EloquentRepository implements LanguageInterface
{
    use SystemLog;

    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(Translate $model)
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
            $payload['text'] = [];

            if (array_key_exists('lang_id', $payload) && array_key_exists('lang_en', $payload)) {
                $payload['text'] = [
                    'id' => $payload['lang_id'],
                    'en' => $payload['lang_en']
                ];

                unset($payload['lang_id']);
                unset($payload['lang_en']);
            }

            $model = $this->model->create($payload);

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
            $payload['text'] = [];

            if (array_key_exists('lang_id', $payload) && array_key_exists('lang_en', $payload)) {
                $payload['text'] = [
                    'id' => $payload['lang_id'],
                    'en' => $payload['lang_en']
                ];

                unset($payload['lang_id']);
                unset($payload['lang_en']);
            }

            $model = $this->findById($modelId);

            return $model->update($payload);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }

    /**
     * Get all searchable fields.
     *
     * @return int
     */
    public function getSearchableFields(): array
    {
        return [
            'group',
            'key',
            'text',
        ];
    }
}
