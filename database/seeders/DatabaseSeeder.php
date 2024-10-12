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
        // To prevent lack of resource while seeding on installer
        $isMustSilent = !file_exists(storage_path('.installed'));

        $this->call([
            TranslateSeeder::class,
            PermissionSeeder::class,
            RoleSeeder::class,
            ApplicationSettingTypeSeeder::class,
            ApplicationSettingSeeder::class,
            MenuMetaSeeder::class,
            MenuSeeder::class,
            UserSeeder::class,
        ], $isMustSilent);
    }
}
