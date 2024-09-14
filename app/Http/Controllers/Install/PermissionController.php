<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\PermissionService;

class PermissionController extends Controller
{
    /**
     * @var PermissionService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(PermissionService $service)
    {
        $this->service = $service;
    }

    /**
     * Shows the permissions page
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        try {
            return inertia('Install/Permissions', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
