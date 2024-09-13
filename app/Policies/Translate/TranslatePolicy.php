<?php

namespace App\Policies\Translate;

use App\Models\User;
use App\Models\Translate;
use App\Enum\DisplayModeType;

class TranslatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, string $mode): bool
    {
        $isModeValid = in_array($mode, DisplayModeType::toArray());

        return auth('web')->check() && $user->hasPermissionTo('translate.index') && $isModeValid;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Translate $list): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.show');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.create');
    }

    /**
     * Determine whether the user can store models.
     */
    public function store(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.store');
    }

    /**
     * Determine whether the user can edit models.
     */
    public function edit(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.edit');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Translate $list): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Translate $list): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('translate.delete');
    }
}
