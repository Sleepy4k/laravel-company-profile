<?php

namespace App\Policies\Log;

use App\Models\User;

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
    public function view(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('log.auth.show');
    }
}