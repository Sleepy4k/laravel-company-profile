<?php

namespace App\Policies\Application;

use App\Models\User;
use App\Enum\DisplayModeType;
use App\Models\ApplicationSetting;

class SettingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, string $mode): bool
    {
        $isModeValid = in_array($mode, DisplayModeType::toArray());

        return auth('web')->check() && $user->hasPermissionTo('application.setting.index') && $isModeValid;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ApplicationSetting $setting): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('application.setting.show');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('application.setting.create');
    }

    /**
     * Determine whether the user can store models.
     */
    public function store(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('application.setting.store');
    }

    /**
     * Determine whether the user can edit models.
     */
    public function edit(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('application.setting.edit');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ApplicationSetting $setting): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('application.setting.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ApplicationSetting $setting): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('application.setting.delete');
    }
}
