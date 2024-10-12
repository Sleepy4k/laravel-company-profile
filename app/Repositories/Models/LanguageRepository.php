<?php

namespace App\Repositories\Models;

use App\Models\Translate;
use App\Traits\SystemLog;
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
     * @return Model|bool
     */
    public function create(array $payload): Model|bool
    {
        $payload['text'] = [];

        if (array_key_exists('lang_id', $payload) && array_key_exists('lang_en', $payload)) {
            $payload['text'] = [
                'id' => $payload['lang_id'],
                'en' => $payload['lang_en']
            ];

            unset($payload['lang_id']);
            unset($payload['lang_en']);
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
        $payload['text'] = [];

        if (array_key_exists('lang_id', $payload) && array_key_exists('lang_en', $payload)) {
            $payload['text'] = [
                'id' => $payload['lang_id'],
                'en' => $payload['lang_en']
            ];

            unset($payload['lang_id']);
            unset($payload['lang_en']);
        }

        $transaction = $this->wrapIntoTransaction(function () use ($modelId, $payload) {
            $model = $this->findById($modelId);

            return $model->update($payload);
        });

        return $transaction;
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
