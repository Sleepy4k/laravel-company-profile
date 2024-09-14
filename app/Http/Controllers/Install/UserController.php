<?php

namespace App\Http\Controllers\Install;

use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use App\Services\Install\UserService;
use App\Http\Requests\Install\UserStoreRequest;

class UserController extends Controller
{
    /**
     * @var UserService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the user step
     *
     * @return Response|RedirectResponse
     */
    public function index(): Response|RedirectResponse
    {
        try {
            return inertia('Install/User', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store the user
     *
     * @param UserStoreRequest $request
     *
     * @return RedirectResponse
     */
    public function store(UserStoreRequest $request): RedirectResponse
    {
        try {
            $this->service->store($request->validated());

            return back();
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
