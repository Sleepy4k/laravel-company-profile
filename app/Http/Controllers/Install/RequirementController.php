<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Support\InstallationStep;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use App\Policies\Install\RequirementPolicy;
use App\Services\Install\RequirementService;

class RequirementController extends Controller
{
    /**
     * @var RequirementService
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
    public function __construct(RequirementService $service)
    {
        $this->service = $service;
        $this->installationStep = new InstallationStep('requirements');
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        Gate::authorize('viewAny', RequirementPolicy::class);

        try {
            $this->installationStep->markAsCompleted();

            return inertia('Install/Requirements', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
