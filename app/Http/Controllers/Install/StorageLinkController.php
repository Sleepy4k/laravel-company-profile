<?php

namespace App\Http\Controllers\Install;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\StorageService;

class StorageLinkController extends Controller
{
    /**
     * @var StorageService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(StorageService $service)
    {
        $this->service = $service;
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(): RedirectResponse
    {
        try {
            $this->service->invoke();

            return back();
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
