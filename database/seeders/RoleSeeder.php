<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Role::count() == 0) {
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

            $roles = config('permission.seeder.role');
            $permissions = config('permission.seeder.permission.admin');

            if (empty($roles)) {
                throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
            }

            foreach ($roles as $role) {
                if (config()->has('permission.seeder.permission.' . $role)) {
                    $permissions = config('permission.seeder.permission.' . $role);

                    if ($permissions == 'all') {
                        $permissions = config('permission.seeder.permission.list');
                    }
                }

                Role::create([
                    'name' => $role,
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ])->syncPermissions($permissions);
            }
        }
    }
}
