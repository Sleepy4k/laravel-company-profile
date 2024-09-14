<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\SetupService;
use App\Http\Requests\Install\SetupStoreRequest;

class SetupController extends Controller
{
    /**
     * @var SetupService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(SetupService $service)
    {
        $this->service = $service;
    }

    /**
     * Application setup
     *
     * @return Response|RedirectResponse
     */
    public function index(): Response|RedirectResponse
    {
        try {
            return inertia('Install/Setup', $this->service->index());
        } catch (\Throwable $th) {
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
