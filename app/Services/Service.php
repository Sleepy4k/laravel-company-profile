<?php

namespace App\Services;

use App\Contracts\Models;

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
     * Model contract constructor.
     *
     * @param  \App\Contracts\Models\UserInterface  $userInterface
     * @param  \App\Contracts\Models\RoleInterface  $roleInterface
     * @param  \App\Contracts\Models\LanguageInterface  $languageInterface
     * @param  \App\Contracts\Models\PermissionInterface  $permissionInterface
     */
    public function __construct(
        Models\UserInterface $userInterface,
        Models\RoleInterface $roleInterface,
        Models\LanguageInterface $languageInterface,
        Models\PermissionInterface $permissionInterface,
    ) {
        $this->userInterface = $userInterface;
        $this->roleInterface = $roleInterface;
        $this->languageInterface = $languageInterface;
        $this->permissionInterface = $permissionInterface;
    }
}
