<?php

namespace App\Http\Controllers;

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
        return inertia('Dashboard', $this->service->invoke());
    }
}
