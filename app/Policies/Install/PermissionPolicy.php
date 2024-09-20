<?php

namespace App\Policies\Install;

use App\Models\User;
use App\Support\InstallationStep;

class PermissionPolicy
{
    /**
     * The installation step.
     *
     * @var \App\Support\InstallationStep
     */
    protected $installationStep;

    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        $this->installationStep = new InstallationStep('permissions');
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        $isAlreadyInstalled = file_exists(storage_path('.installed'));
        $isRequirementsMet = $this->installationStep->isPreviousStepCompleted();

        return !$isAlreadyInstalled && $isRequirementsMet;
    }
}
