<?php

namespace App\Policies\Install;

use App\Models\User;
use App\Support\InstallationStep;

class FinishPolicy
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
        $this->installationStep = new InstallationStep('finish');
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        $isRequirementsMet = $this->installationStep->isPreviousStepCompleted();

        return $isRequirementsMet;
    }
}
