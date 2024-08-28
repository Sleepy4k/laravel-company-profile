<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use App\Support\InstallationRequirementsChecker;

class RequirementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param InstallationRequirementsChecker $checker
     *
     * @return Response
     */
    public function __invoke(InstallationRequirementsChecker $checker): Response
    {
        $requirements = $checker->check();
        $php = $checker->checkPHPversion();

        return Inertia::render('Install/Requirements', [
            'php' => $php,
            'requirements' => $requirements
        ]);
    }
}
