<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Support\InstallationPermissionsChecker;

class PermissionController extends Controller
{
    /**
     * Shows the permissions page
     *
     * @param InstallationPermissionsChecker $checker
     *
     * @return Response
     */
    public function __invoke(InstallationPermissionsChecker $checker): Response
    {
        $permissions = $checker->check();
        $process_user = !function_exists('posix_getpwuid') ? get_current_user() : posix_getpwuid(posix_geteuid())['name'];

        return Inertia::render('Install/Permissions', [
            'permissions' => $permissions,
            'process_user' => $process_user
        ]);
    }
}
