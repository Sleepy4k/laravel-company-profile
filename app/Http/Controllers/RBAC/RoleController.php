<?php

namespace App\Http\Controllers\RBAC;

use App\Models\Role;
use App\Services\RBAC\RoleService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\RBAC\StoreRoleRequest;
use App\Http\Requests\RBAC\UpdateRoleRequest;

class RoleController extends Controller
{
    /**
     * @var RoleService
     */
    private $service;

    /**
     * Create a new controller instance.
     */
    public function __construct(RoleService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Role::class);

        try {
            session()->put('rbac.role.url', request()->fullUrl());

            return inertia('RBAC/Role/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Role::class);

        try {
            return inertia('RBAC/Role/Create', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        Gate::authorize('store', Role::class);

        try {
            $this->service->store($request->validated());

            return session()->has('rbac.role.url')
                ? redirect(session()->get('rbac.role.url'))
                : to_route('rbac.roles.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        Gate::authorize('view', $role);

        try {
            return inertia('RBAC/Role/Show', $this->service->show($role));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        Gate::authorize('edit', $role);

        try {
            return inertia('RBAC/Role/Edit', $this->service->edit($role));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        Gate::authorize('update', $role);

        try {
            $this->service->update($request->validated(), $role->id);

            return session()->has('rbac.role.url')
                ? redirect(session()->get('rbac.role.url'))
                : to_route('rbac.roles.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('delete', $role);

        try {
            $this->service->destroy($role->id);

            return session()->has('rbac.role.url')
                ? redirect(session()->get('rbac.role.url'))
                : to_route('rbac.roles.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
