<?php

namespace App\Policies\Install;

use App\Models\User;

class RequirementPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        $isAlreadyInstalled = file_exists(storage_path('.installed'));

        return !$isAlreadyInstalled;
    }
}
