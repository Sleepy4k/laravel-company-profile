<?php

namespace App\Services\Account;

use App\Services\Service;
use App\Traits\PermissionData;
use App\DataTables\User\UserDataTable;
use App\Models\User;

class UserService extends Service
{
    use PermissionData;

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new UserDataTable($this->userInterface);
        $queryParams = request()->query() ?: null;
        $data = $dataTable->getData(10, ['*'], ['roles']);

        return compact('data', 'queryParams');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return array
     */
    public function create(): array
    {
        $roles = $this->roleInterface->all(['id', 'name'], ['permissions:id,name']);
        $permissions = $this->getPermissions();
        $backUrl = session()->get('account.user.url') ?? route('users.index');

        return compact('roles', 'permissions', 'backUrl');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param array $request
     *
     * @return void
     */
    public function store(array $request): void
    {
        try {
            $this->userInterface->create($request);

            session()->flash('success', 'Data has been created successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to create.');

            throw $th;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     *
     * @return array
     */
    public function show(User $user): array
    {
        $data = $user->load(['roles', 'permissions']);
        $permissions = $this->getPermissions();
        $backUrl = session()->get('account.user.url') ?? route('users.index');

        return compact('data', 'permissions', 'backUrl');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     *
     * @return array
     */
    public function edit(User $user): array
    {
        $user = $user->load(['roles', 'permissions']);
        $roles = $this->roleInterface->all(['id', 'name'], ['permissions:id,name']);
        $permissions = $this->getPermissions();
        $backUrl = session()->get('account.user.url') ?? route('users.index');

        return compact('user', 'roles', 'permissions', 'backUrl');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param array $request
     * @param int $id
     *
     * @return void
     */
    public function update(array $request, int $id): void
    {
        try {
            $this->userInterface->update($id, $request);

            session()->flash('success', 'Data has been updated successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to update.');

            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return void
     */
    public function destroy(int $id): void
    {
        try {
            $this->userInterface->deleteById($id);

            session()->flash('success', 'Data has been deleted successfully.');
        } catch (\Throwable $th) {
            session()->flash('error', 'Data failed to delete.');

            throw $th;
        }
    }
}
