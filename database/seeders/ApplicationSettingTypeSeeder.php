<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ApplicationSettingType;

class ApplicationSettingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (ApplicationSettingType::count() == 0) {
            $settings = ApplicationSettingType::factory()->make();

            ApplicationSettingType::insert($settings->toArray());
        }
    }
}
