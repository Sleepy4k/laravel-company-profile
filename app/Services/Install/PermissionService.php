<?php

namespace App\Services\Install;

use App\Services\Service;
use App\Support\InstallationPermissionsChecker;

class PermissionService extends Service
{
    /**
     * The installation requirements checker.
     *
     * @var InstallationPermissionsChecker
     */
    protected $checker;

    /**
     * Create a new service instance.
     *
     * @param InstallationPermissionsChecker $checker
     *
     * @return void
     */
    public function __construct(InstallationPermissionsChecker $checker)
    {
        $this->checker = $checker;
    }

    /**
     * Handle the incoming request.
     *
     * @return array
     */
    public function invoke(): array
    {
        try {
            $permissions = $this->checker->check();
            $process_user = !function_exists('posix_getpwuid') ? get_current_user() : posix_getpwuid(posix_geteuid())['name'];

            return compact('permissions', 'process_user');
        } catch (\Exception $e) {
            throw new \Exception('Could not check permissions: '.$e->getMessage());
        }
    }
}
