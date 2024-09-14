<?php

namespace App\Http\Controllers\Error;

use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Error\FallbackService;

class FallbackController extends Controller
{
    /**
     * @var FallbackService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(FallbackService $service)
    {
        $this->service = $service;
    }

    /**
     * Migrate the database
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        try {
            return inertia('Error', $this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
