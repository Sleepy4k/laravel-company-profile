<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Support\InstallationStep;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use App\Policies\Install\PermissionPolicy;
use App\Services\Install\PermissionService;

class PermissionController extends Controller
{
    /**
     * @var PermissionService
     */
    private $service;

    /**
     * The installation step.
     *
     * @var \App\Support\InstallationStep
     */
    protected $installationStep;

    /**
     * Create a new controller instance.
     */
    public function __construct(PermissionService $service)
    {
        $this->service = $service;
        $this->installationStep = new InstallationStep('permissions');
    }

    /**
     * Shows the permissions page
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        $gate = Gate::inspect('viewAny', PermissionPolicy::class);
        if (!$gate->allowed()) return to_route('install.requirements');

        try {
            $this->installationStep->markAsCompleted();

            return inertia('Install/Permissions', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
