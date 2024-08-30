<?php

namespace App\Services\Install;

use App\Services\Service;
use Illuminate\Support\Facades\Artisan;

class UserService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        return [];
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
            // Create the user
            $user = $this->userInterface->create($request);

            // Check total roles
            $roles = $this->roleInterface->count();

            // If there are no roles, run the seeder
            if ($roles === 0) {
                // Run the seeder for permission and role
                Artisan::call('db:seed', ['--class' => 'PermissionSeeder']);
                Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
            }

            // Super admin role name
            $superAdminRole = 'superadmin';

            // Check if role super admin exists
            $role = $this->roleInterface->findByCustomId(['name' => $superAdminRole], ['name']);

            // If role super admin does not exist, create it
            if (!$role) $role = $this->roleInterface->create(['name' => $superAdminRole, 'guard_name' => 'web']);

            // Attach the super admin role to the user
            $user->assignRole($role->name);
        } catch (\Exception $e) {
            // Check if the user already created
            $user = $this->userInterface->findByCustomId(['email' => $request['email']], ['id']);

            // If the user already created, delete the user
            if ($user) $this->userInterface->deleteById($user->id);

            throw new \Exception('Could not create the user: '.$e->getMessage());
        }
    }
}
