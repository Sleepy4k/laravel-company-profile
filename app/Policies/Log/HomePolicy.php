<?php

namespace App\Policies\Log;

use App\Models\User;

class HomePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('log.index');
    }
}