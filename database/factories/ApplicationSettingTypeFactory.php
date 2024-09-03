<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ApplicationSettingType>
 */
class ApplicationSettingTypeFactory extends Factory
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
                'name' => 'Default',
                'description' => 'Default application setting',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Meta Tag',
                'description' => 'Application meta tag setting',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];
    }
}
