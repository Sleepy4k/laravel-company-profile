<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            TranslateSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            ApplicationSettingTypeSeeder::class,
            ApplicationSettingSeeder::class,
            UserSeeder::class,
        ]);
    }
}
