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
        if (User::count() == 0) {
            User::factory(25)->create()->each(function ($user) {
                $role = fake()->randomElement(config('permission.seeder.role'));
                $user->assignRole($role);
            });
        }

        if (!User::where('email', 'pandu300478@gmail.com')->exists()) {
            User::create([
                'name' => fake()->name(),
                'email' => 'pandu300478@gmail.com',
                'password' => bcrypt('password'),
            ])->assignRole('superadmin');
        }
    }
}
