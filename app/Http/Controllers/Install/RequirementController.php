<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\RequirementService;

class RequirementController extends Controller
{
    /**
     * @var RequirementService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(RequirementService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        try {
            return Inertia::render('Install/Requirements', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
