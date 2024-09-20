<?php

namespace App\Http\Controllers\RBAC;

use App\Models\Permission;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use App\Services\RBAC\PermissionService;
use App\Http\Requests\RBAC\StorePermissionRequest;
use App\Http\Requests\RBAC\UpdatePermissionRequest;

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
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Permission::class);

        try {
            session()->put('rbac.permission.url', request()->fullUrl());

            return inertia('RBAC/Permission/Home', $this->service->index());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Permission::class);

        try {
            return inertia('RBAC/Permission/Create', $this->service->create());
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        Gate::authorize('store', Permission::class);

        try {
            $this->service->store($request->validated());

            return session()->has('rbac.permission.url')
                ? redirect(session()->get('rbac.permission.url'))
                : to_route('rbac.permissions.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Permission $permission)
    {
        Gate::authorize('view', $permission);

        try {
            return inertia('RBAC/Permission/Show', $this->service->show($permission));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Permission $permission)
    {
        Gate::authorize('edit', $permission);

        try {
            return inertia('RBAC/Permission/Edit', $this->service->edit($permission));
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        Gate::authorize('update', $permission);

        try {
            $this->service->update($request->validated(), $permission->id);

            return session()->has('rbac.permission.url')
                ? redirect(session()->get('rbac.permission.url'))
                : to_route('rbac.permissions.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Permission $permission)
    {
        Gate::authorize('delete', $permission);

        try {
            $this->service->destroy($permission->id);

            return session()->has('rbac.permission.url')
                ? redirect(session()->get('rbac.permission.url'))
                : to_route('rbac.permissions.index');
        } catch (\Throwable $th) {
            return $this->redirectError($th);
        }
    }
}
