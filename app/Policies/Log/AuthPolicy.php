<?php

namespace App\Policies\Log;

use App\Models\User;
use Spatie\Activitylog\Models\Activity;

class AuthPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('log.auth.index');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Activity $auth): bool
    {
        $isLogNameValid = str_contains($auth->log_name, 'auth');

        return auth('web')->check() && $user->hasPermissionTo('log.auth.show') && $isLogNameValid;
    }
}
