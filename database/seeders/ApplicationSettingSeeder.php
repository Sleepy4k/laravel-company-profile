<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ApplicationSetting;

class ApplicationSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (ApplicationSetting::count() == 0) {
            $settings = ApplicationSetting::factory()->make();

            ApplicationSetting::insert($settings->toArray());
        }
    }
}
