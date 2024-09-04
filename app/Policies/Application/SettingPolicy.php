<?php

namespace App\Policies\Application;

use App\Models\User;
use App\Models\ApplicationSetting;

class SettingPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo('application.index');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ApplicationSetting $applicationSetting): bool
    {
        return $user->hasPermissionTo('application.show');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('application.create');
    }

    /**
     * Determine whether the user can store models.
     */
    public function store(User $user): bool
    {
        return $user->hasPermissionTo('application.create');
    }

    /**
     * Determine whether the user can edit models.
     */
    public function edit(User $user): bool
    {
        return $user->hasPermissionTo('application.update');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ApplicationSetting $applicationSetting): bool
    {
        return $user->hasPermissionTo('application.update');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ApplicationSetting $applicationSetting): bool
    {
        return $user->hasPermissionTo('application.delete');
    }
}
