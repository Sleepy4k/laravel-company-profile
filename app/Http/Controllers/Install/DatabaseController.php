<?php

namespace App\Http\Controllers\Install;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\DatabaseService;

class DatabaseController extends Controller
{
    /**
     * @var DatabaseService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(DatabaseService $service)
    {
        $this->service = $service;
    }

    /**
     * Migrate the database
     *
     * @return RedirectResponse
     */
    public function __invoke(): RedirectResponse
    {
        try {
            $this->service->invoke();

            return to_route('install.user');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
