<?php

namespace App\Policies\Translate;

use App\Models\User;
use App\Enum\LanguageEnum;

class LanguagePolicy
{
    /**
     * Determine whether the user can edit models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.index');
    }

    /**
     * Determine whether the user can store models.
     */
    public function store(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.store');
    }
}
