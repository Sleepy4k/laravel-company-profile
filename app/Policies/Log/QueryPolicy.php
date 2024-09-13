<?php

namespace App\Policies\Log;

use App\Models\User;

class QueryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return auth('web')->check() && $user->hasPermissionTo('log.query.index');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, string $name): bool
    {
        $isFormatValid = preg_match('/^\d{4}-\d{2}-\d{2}$/', $name);
        $isDateValid = strtotime($name) <= strtotime(date('Y-m-d'));
        $isFileExists = file_exists(storage_path('logs/query-'.$name.'.log'));

        return auth('web')->check() && $user->hasPermissionTo('log.query.show') && $isFormatValid && $isDateValid && $isFileExists;
    }
}
