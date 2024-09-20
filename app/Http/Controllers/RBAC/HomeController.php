<?php

namespace App\Http\Controllers\RBAC;

use App\Policies\RBAC\HomePolicy;
use App\Services\RBAC\HomeService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class HomeController extends Controller
{
    /**
     * @var HomeService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(HomeService $service)
    {
        $this->service = $service;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        Gate::authorize('viewAny', HomePolicy::class);

        try {
            return inertia('RBAC/Home', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
