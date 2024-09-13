<?php

namespace App\Policies\Log;

use App\Models\User;

class SystemPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('log.system.index');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, string $name): bool
    {
        $isFormatValid = preg_match('/^\d{4}-\d{2}-\d{2}$/', $name);
        $isDateValid = strtotime($name) <= strtotime(date('Y-m-d'));
        $isFileExists = file_exists(storage_path('logs/laravel-'.$name.'.log'));

        return auth('web')->check() && $user->hasPermissionTo('log.system.show') && $isFormatValid && $isDateValid && $isFileExists;
    }
}
