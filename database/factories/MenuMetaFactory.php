<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MenuMetaFactory extends Factory
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
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.dashboard.title',
                'route' => null,
                'permission' => null,
                'parameters' => null,
                'active_routes' => null,
                'is_sortable' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.dashboard.home.title',
                'route' => 'dashboard.index',
                'permission' => 'dashboard.index',
                'parameters' => null,
                'active_routes' => 'dashboard.index',
                'is_sortable' => false,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.dashboard.gallery.title',
                'route' => 'gallery.index',
                'permission' => 'dashboard.index',
                'parameters' => null,
                'active_routes' => 'dashboard.index',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.dashboard.blog.title',
                'route' => 'blog.index',
                'permission' => 'dashboard.index',
                'parameters' => null,
                'active_routes' => 'dashboard.index',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.rbac.title',
                'route' => null,
                'permission' => null,
                'parameters' => null,
                'active_routes' => null,
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.rbac.role.title',
                'route' => 'rbac.roles.index',
                'permission' => 'rbac.role.index',
                'parameters' => null,
                'active_routes' => 'rbac.roles.index, rbac.roles.show, rbac.roles.create, rbac.roles.edit',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.rbac.permission.title',
                'route' => 'rbac.permissions.index',
                'permission' => 'rbac.permission.index',
                'parameters' => null,
                'active_routes' => 'rbac.permissions.index, rbac.permissions.show, rbac.permissions.create, rbac.permissions.edit',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.application.title',
                'route' => null,
                'permission' => null,
                'parameters' => null,
                'active_routes' => null,
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.application.setting.title',
                'route' => 'application.index',
                'permission' => 'application.setting.index',
                'parameters' => 'table',
                'active_routes' => 'application.index, application.show, application.create, application.edit',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.application.type.title',
                'route' => 'application.type.index',
                'permission' => 'application.type.index',
                'parameters' => null,
                'active_routes' => 'application.type.index, application.type.show, application.type.create, application.type.edit',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.application.translate.title',
                'route' => 'translate.index',
                'permission' => 'translate.index',
                'parameters' => 'table',
                'active_routes' => 'translate.index, translate.show, translate.create, translate.edit',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.log.title',
                'route' => null,
                'permission' => null,
                'parameters' => null,
                'active_routes' => null,
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.log.auth.title',
                'route' => 'log.auth.index',
                'permission' => 'log.auth.index',
                'parameters' => null,
                'active_routes' => 'log.auth.index, log.auth.show',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.log.model.title',
                'route' => 'log.model.index',
                'permission' => 'log.model.index',
                'parameters' => null,
                'active_routes' => 'log.model.index, log.model.show',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.log.system.title',
                'route' => 'log.system.index',
                'permission' => 'log.system.index',
                'parameters' => null,
                'active_routes' => 'log.system.index, log.system.show',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'uuid' => \Illuminate\Support\Str::uuid(),
                'translation_key' => 'page.log.query.title',
                'route' => 'log.query.index',
                'permission' => 'log.query.index',
                'parameters' => null,
                'active_routes' => 'log.query.index, log.query.show',
                'is_sortable' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];
    }
}
