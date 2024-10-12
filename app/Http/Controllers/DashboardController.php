<?php

namespace App\Http\Controllers;

use Inertia\Response;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    /**
     * @var DashboardService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(DashboardService $service)
    {
        $this->service = $service;
    }

    /**
     * Handle the incoming request.
     *
     * @return Response
     */
    public function __invoke(): Response
    {
        return inertia('Dashboard/Index', $this->service->invoke());
    }
}
