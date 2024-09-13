<?php

namespace App\Repositories\Models;

use App\Models\Permission;
use App\Repositories\EloquentRepository;
use App\Contracts\Models\PermissionInterface;

class PermissionRepository extends EloquentRepository implements PermissionInterface
{
    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(Permission $model)
    {
        $this->model = $model;
    }
}
