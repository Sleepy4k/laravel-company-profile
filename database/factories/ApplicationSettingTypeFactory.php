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
        // Define the default application setting type
        // Do not change the order
        return [
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Default',
                'description' => 'Default application setting',
                'category' => 'string',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Meta Tag',
                'description' => 'Application meta tag setting',
                'category' => 'string',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Logo',
                'description' => 'Application logo setting',
                'category' => 'file',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
    }
}
