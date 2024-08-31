<?php

namespace App\Repositories\Models;

use App\Models\ApplicationSettingType;
use App\Repositories\EloquentRepository;
use App\Contracts\Models\ApplicationSettingTypeInterface;

class ApplicationSettingTypeRepository extends EloquentRepository implements ApplicationSettingTypeInterface
{
    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(ApplicationSettingType $model)
    {
        $this->model = $model;
    }
}
