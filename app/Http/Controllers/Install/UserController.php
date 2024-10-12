<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Support\InstallationStep;
use App\Http\Controllers\Controller;
use App\Policies\Install\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\UserService;
use App\Http\Requests\Install\UserStoreRequest;

class UserController extends Controller
{
    /**
     * @var UserService
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
    public function __construct(UserService $service)
    {
        $this->service = $service;
        $this->installationStep = new InstallationStep('user');
    }

    /**
     * Display the user step
     *
     * @return Response|RedirectResponse
     */
    public function index(): Response|RedirectResponse
    {
        $gate = Gate::inspect('viewAny', UserPolicy::class);
        if (!$gate->allowed()) return to_route('install.setup');

        try {
            $this->installationStep->markAsCompleted();

            return inertia('Install/User', $this->service->index());
        } catch (\Throwable $th) {
            $this->installationStep->markAsNotCompleted();
            return $this->redirectError($th);
        }
    }

    /**
     * Store the user
     *
     * @param UserStoreRequest $request
     *
     * @return RedirectResponse
     */
    public function store(UserStoreRequest $request): RedirectResponse
    {
        try {
            $this->service->store($request->validated());

            return back();
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
