<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Menu>
 */
class MenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Define the default application menu
        // Do not change the order
        return [
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Dashboard',
                'order' => 0,
                'parent_id' => null,
                'meta_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Home',
                'order' => 1,
                'parent_id' => 1,
                'meta_id' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Gallery',
                'order' => 2,
                'parent_id' => 1,
                'meta_id' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Blog',
                'order' => 3,
                'parent_id' => 1,
                'meta_id' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'RBAC',
                'order' => 0,
                'parent_id' => null,
                'meta_id' => 5,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Role',
                'order' => 1,
                'parent_id' => 5,
                'meta_id' => 6,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Permission',
                'order' => 2,
                'parent_id' => 5,
                'meta_id' => 7,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Application',
                'order' => 0,
                'parent_id' => null,
                'meta_id' => 8,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Setting',
                'order' => 1,
                'parent_id' => 8,
                'meta_id' => 9,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Setting Type',
                'order' => 2,
                'parent_id' => 8,
                'meta_id' => 10,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Translate',
                'order' => 3,
                'parent_id' => 8,
                'meta_id' => 11,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Log',
                'order' => 0,
                'parent_id' => null,
                'meta_id' => 12,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Authentication',
                'order' => 1,
                'parent_id' => 12,
                'meta_id' => 13,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Model',
                'order' => 2,
                'parent_id' => 12,
                'meta_id' => 14,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'System',
                'order' => 3,
                'parent_id' => 12,
                'meta_id' => 15,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'name' => 'Query',
                'order' => 4,
                'parent_id' => 12,
                'meta_id' => 16,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
    }
}
