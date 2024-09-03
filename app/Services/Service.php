<?php

namespace App\Services;

use App\Contracts\Models;
use Illuminate\Database\Eloquent\Model;

class Service
{
    /**
     * @var userInterface
     */
    protected $userInterface;

    /**
     * @var roleInterface
     */
    protected $roleInterface;

    /**
     * @var languageInterface
     */
    protected $languageInterface;

    /**
     * @var permissionInterface
     */
    protected $permissionInterface;

    /**
     * @var applicationSettingInterface
     */
    protected $applicationSettingInterface;

    /**
     * @var applicationSettingTypeInterface
     */
    protected $applicationSettingTypeInterface;

    /**
     * Model contract constructor.
     *
     * @param  \App\Contracts\Models\UserInterface  $userInterface
     * @param  \App\Contracts\Models\RoleInterface  $roleInterface
     * @param  \App\Contracts\Models\LanguageInterface  $languageInterface
     * @param  \App\Contracts\Models\PermissionInterface  $permissionInterface
     * @param  \App\Contracts\Models\ApplicationSettingInterface  $applicationSettingInterface
     * @param  \App\Contracts\Models\ApplicationSettingTypeInterface  $applicationSettingTypeInterface
     */
    public function __construct(
        Models\UserInterface $userInterface,
        Models\RoleInterface $roleInterface,
        Models\LanguageInterface $languageInterface,
        Models\PermissionInterface $permissionInterface,
        Models\ApplicationSettingInterface $applicationSettingInterface,
        Models\ApplicationSettingTypeInterface $applicationSettingTypeInterface
    ) {
        $this->userInterface = $userInterface;
        $this->roleInterface = $roleInterface;
        $this->languageInterface = $languageInterface;
        $this->permissionInterface = $permissionInterface;
        $this->applicationSettingInterface = $applicationSettingInterface;
        $this->applicationSettingTypeInterface = $applicationSettingTypeInterface;
    }
}
