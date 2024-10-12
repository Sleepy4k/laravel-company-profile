<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Support\InstallationStep;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use App\Policies\Install\SetupPolicy;
use App\Services\Install\SetupService;
use App\Http\Requests\Install\SetupStoreRequest;

class SetupController extends Controller
{
    /**
     * @var SetupService
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
    public function __construct(SetupService $service)
    {
        $this->service = $service;
        $this->installationStep = new InstallationStep('setup');
    }

    /**
     * Application setup
     *
     * @return Response|RedirectResponse
     */
    public function index(): Response|RedirectResponse
    {
        $gate = Gate::inspect('viewAny', SetupPolicy::class);
        if (!$gate->allowed()) return to_route('install.permissions');

        try {
            $this->installationStep->markAsCompleted();

            return inertia('Install/Setup', $this->service->index());
        } catch (\Throwable $th) {
            $this->installationStep->markAsNotCompleted();
            return $this->redirectError($th);
        }
    }

    /**
     * Store the environmental variables
     *
     * @param SetupStoreRequest $request
     *
     * @return RedirectResponse
     */
    public function store(SetupStoreRequest $request): RedirectResponse
    {
        try {
            $this->service->store($request->validated());

            return back()->withInput();
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
