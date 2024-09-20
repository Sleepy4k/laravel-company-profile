<?php

namespace App\Policies\RBAC;

use App\Models\User;

class HomePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('rbac.index');
    }
}
