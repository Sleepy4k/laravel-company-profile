<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!file_exists(storage_path('.installed'))) return;

        $totalUser = User::query()->withoutCache()->count();
        $permissions = config('permission.seeder.role');
        $isSuperAdminExist = User::query()->withoutCache()->where('email', 'pandu300478@gmail.com')->exists();

        if ($totalUser <= 1 && (!$isSuperAdminExist || $totalUser == 0)) {
            User::factory(25)->create()->each(function ($user) use ($permissions) {
                $role = fake()->randomElement($permissions);
                $user->assignRole($role);
            });
        }

        if (!$isSuperAdminExist) {
            User::create([
                'name' => fake()->name(),
                'email' => 'pandu300478@gmail.com',
                'password' => 'password',
            ])->assignRole('superadmin');
        }
    }
}
