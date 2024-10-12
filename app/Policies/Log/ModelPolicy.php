<?php

namespace App\Policies\Log;

use App\Models\User;
use Spatie\Activitylog\Models\Activity;

class ModelPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('log.model.index');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Activity $model): bool
    {
        $isLogNameValid = str_contains($model->log_name, 'model');

        return auth('web')->check() && $user->hasPermissionTo('log.model.show') && $isLogNameValid;
    }
}
