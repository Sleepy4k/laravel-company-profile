<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Support\InstallationStep;
use App\Http\Controllers\Controller;
use App\Policies\Install\FinishPolicy;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\FinishedService;
use Illuminate\Support\Facades\Gate;

class FinishedController extends Controller
{
    /**
     * @var FinishedService
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
    public function __construct(FinishedService $service)
    {
        $this->service = $service;
        $this->installationStep = new InstallationStep('finish');
    }

    /**
     * Display the finish step or apply patches
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        $gate = Gate::inspect('viewAny', FinishPolicy::class);
        if (!$gate->allowed()) return to_route('install.user');

        try {
            $this->installationStep->markAsCompleted();

            return inertia('Install/Finish', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
