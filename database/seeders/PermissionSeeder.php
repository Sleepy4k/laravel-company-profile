<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Permission::query()->withoutCache()->count() == 0) {
            app()[PermissionRegistrar::class]->forgetCachedPermissions();

            $permissions = config('permission.seeder.permission.list');

            if (empty($permissions)) {
                throw new \Exception('Error: config/permission.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
            }

            $permission = collect($permissions)->map(function ($name) {
                return [
                    'uuid' => \Illuminate\Support\Str::uuid(),
                    'name' => $name,
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            });

            Permission::insert($permission->toArray());
        }
    }
}
