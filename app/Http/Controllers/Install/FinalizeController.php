<?php

namespace App\Http\Controllers\Install;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\FinalizeService;

class FinalizeController extends Controller
{
    /**
     * @var FinalizeService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(FinalizeService $service)
    {
        $this->service = $service;
    }

    /**
     * Finalize the installation with redirect
     *
     * @return RedirectResponse
     */
    public function __invoke(): RedirectResponse
    {
        try {
            return redirect($this->service->invoke());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
