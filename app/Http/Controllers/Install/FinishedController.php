<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\FinishedService;

class FinishedController extends Controller
{
    /**
     * @var FinishedService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(FinishedService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the finish step or apply patches
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        try {
            return Inertia::render('Install/Finish', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
