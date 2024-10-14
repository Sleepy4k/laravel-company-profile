<?php

namespace App\Http\Controllers\Account;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Services\Account\UserService;
use App\Http\Requests\Account\StoreUserRequest;
use App\Http\Requests\Account\UpdateUserRequest;

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
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', User::class);

        try {
            session()->put('account.user.url', request()->fullUrl());

            return inertia('User/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', User::class);

        try {
            return inertia('User/Create', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        Gate::authorize('store', User::class);

        try {
            $this->service->store($request->validated());

            return session()->has('account.user.url')
                ? redirect(session()->get('account.user.url'))
                : to_route('users.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        Gate::authorize('view', $user);

        try {
            return inertia('User/Show', $this->service->show($user));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        Gate::authorize('edit', $user);

        try {
            return inertia('User/Edit', $this->service->edit($user));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        Gate::authorize('update', $user);

        try {
            $this->service->update($request->validated(), $user->id);

            return session()->has('account.user.url')
                ? redirect(session()->get('account.user.url'))
                : to_route('users.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('delete', $user);

        try {
            $this->service->destroy($user->id);

            return session()->has('account.user.url')
                ? redirect(session()->get('account.user.url'))
                : to_route('users.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
