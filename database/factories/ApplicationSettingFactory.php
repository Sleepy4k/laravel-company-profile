<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ApplicationSetting>
 */
class ApplicationSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            [
                'key' => 'app_name',
                'display' => 'Application Name',
                'value' => 'Company Profile',
                'description' => 'Application name',
                'type_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_description',
                'display' => 'Application Description',
                'value' => 'Best Company Profile',
                'description' => 'Application description',
                'type_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_logo',
                'display' => 'Application Logo',
                'value' => '',
                'description' => 'Application logo',
                'type_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_favicon',
                'display' => 'Application Favicon',
                'value' => '',
                'description' => 'Application favicon',
                'type_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_meta_title',
                'display' => 'Application Meta Title',
                'value' => 'Company Profile',
                'description' => 'Application meta title',
                'type_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_meta_description',
                'display' => 'Application Meta Description',
                'value' => 'Best Company Profile',
                'description' => 'Application meta description',
                'type_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_meta_keyword',
                'display' => 'Application Meta Keyword',
                'value' => 'company, profile, laravel, inertiajs',
                'description' => 'Application meta keyword',
                'type_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'key' => 'app_meta_author',
                'display' => 'Application Meta Author',
                'value' => 'Benjamin4k',
                'description' => 'Application meta author',
                'type_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];
    }
}
