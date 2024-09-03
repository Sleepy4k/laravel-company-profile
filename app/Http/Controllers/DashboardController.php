<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Services\DashboardService;
use Illuminate\Routing\Controllers\HasMiddleware;

class DashboardController extends Controller implements HasMiddleware
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
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            'verified',
        ];
    }

    /**
     * Handle the incoming request.
     *
     * @return Response
     */
    public function __invoke(): Response
    {
        return Inertia::render('Dashboard', $this->service->invoke());
    }
}
