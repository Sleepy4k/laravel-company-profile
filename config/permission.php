<?php

return [

    'models' => [

        /*
         * When using the "HasPermissions" trait from this package, we need to know which
         * Eloquent model should be used to retrieve your permissions. Of course, it
         * is often just the "Permission" model but you may use whatever you like.
         *
         * The model you want to use as a Permission model needs to implement the
         * `Spatie\Permission\Contracts\Permission` contract.
         */

        'permission' => App\Models\Permission::class,

        /*
         * When using the "HasRoles" trait from this package, we need to know which
         * Eloquent model should be used to retrieve your roles. Of course, it
         * is often just the "Role" model but you may use whatever you like.
         *
         * The model you want to use as a Role model needs to implement the
         * `Spatie\Permission\Contracts\Role` contract.
         */

        'role' => App\Models\Role::class,

    ],

    'table_names' => [

        /*
         * When using the "HasRoles" trait from this package, we need to know which
         * table should be used to retrieve your roles. We have chosen a basic
         * default value but you may easily change it to any table you like.
         */

        'roles' => env('PERMISSION_TABLE_ROLES', 'roles'),

        /*
         * When using the "HasPermissions" trait from this package, we need to know which
         * table should be used to retrieve your permissions. We have chosen a basic
         * default value but you may easily change it to any table you like.
         */

        'permissions' => env('PERMISSION_TABLE_PERMISSIONS', 'permissions'),

        /*
         * When using the "HasPermissions" trait from this package, we need to know which
         * table should be used to retrieve your models permissions. We have chosen a
         * basic default value but you may easily change it to any table you like.
         */

        'model_has_permissions' => env('PERMISSION_TABLE_MODEL_HAS_PERMISSIONS', 'model_has_permissions'),

        /*
         * When using the "HasRoles" trait from this package, we need to know which
         * table should be used to retrieve your models roles. We have chosen a
         * basic default value but you may easily change it to any table you like.
         */

        'model_has_roles' => env('PERMISSION_TABLE_MODEL_HAS_ROLES', 'model_has_roles'),

        /*
         * When using the "HasRoles" trait from this package, we need to know which
         * table should be used to retrieve your roles permissions. We have chosen a
         * basic default value but you may easily change it to any table you like.
         */

        'role_has_permissions' => env('PERMISSION_TABLE_ROLE_HAS_PERMISSIONS', 'role_has_permissions'),
    ],

    'column_names' => [
        /*
         * Change this if you want to name the related pivots other than defaults
         */
        'role_pivot_key' => null, //default 'role_id',
        'permission_pivot_key' => null, //default 'permission_id',

        /*
         * Change this if you want to name the related model primary key other than
         * `model_id`.
         *
         * For example, this would be nice if your primary keys are all UUIDs. In
         * that case, name this `model_uuid`.
         */

        'model_morph_key' => 'model_id',

        /*
         * Change this if you want to use the teams feature and your related model's
         * foreign key is other than `team_id`.
         */

        'team_foreign_key' => 'team_id',
    ],

    /*
     * When set to true, the method for checking permissions will be registered on the gate.
     * Set this to false if you want to implement custom logic for checking permissions.
     */

    'register_permission_check_method' => true,

    /*
     * When set to true, Laravel\Octane\Events\OperationTerminated event listener will be registered
     * this will refresh permissions on every TickTerminated, TaskTerminated and RequestTerminated
     * NOTE: This should not be needed in most cases, but an Octane/Vapor combination benefited from it.
     */
    'register_octane_reset_listener' => false,

    /*
     * Teams Feature.
     * When set to true the package implements teams using the 'team_foreign_key'.
     * If you want the migrations to register the 'team_foreign_key', you must
     * set this to true before doing the migration.
     * If you already did the migration then you must make a new migration to also
     * add 'team_foreign_key' to 'roles', 'model_has_roles', and 'model_has_permissions'
     * (view the latest version of this package's migration file)
     */

    'teams' => false,

    /*
     * Passport Client Credentials Grant
     * When set to true the package will use Passports Client to check permissions
     */

    'use_passport_client_credentials' => false,

    /*
     * When set to true, the required permission names are added to exception messages.
     * This could be considered an information leak in some contexts, so the default
     * setting is false here for optimum safety.
     */

    'display_permission_in_exception' => false,

    /*
     * When set to true, the required role names are added to exception messages.
     * This could be considered an information leak in some contexts, so the default
     * setting is false here for optimum safety.
     */

    'display_role_in_exception' => false,

    /*
     * By default wildcard permission lookups are disabled.
     * See documentation to understand supported syntax.
     */

    'enable_wildcard_permission' => false,

    /*
     * The class to use for interpreting wildcard permissions.
     * If you need to modify delimiters, override the class and specify its name here.
     */
    // 'permission.wildcard_permission' => Spatie\Permission\WildcardPermission::class,

    /* Cache-specific settings */

    'cache' => [

        /*
         * By default all permissions are cached for 24 hours to speed up performance.
         * When permissions or roles are updated the cache is flushed automatically.
         */

        'expiration_time' => \DateInterval::createFromDateString('24 hours'),

        /*
         * The cache key used to store all permissions.
         */

        'key' => env('PERMISSION_CACHE_KEY', 'spatie.permission.cache'),

        /*
         * You may optionally indicate a specific cache driver to use for permission and
         * role caching using any of the `store` drivers listed in the cache.php config
         * file. Using 'default' here means to use the `default` set in cache.php.
         */

        'store' => env('PERMISSION_CACHE_STORE', 'default'),
    ],

    /* Configurations for application */

    'role' => [
        'default' => 'admin',
    ],

    /* Database seeders */

    'seeder' => [
        'role' => [
            'banned',
            'blogger',
            'designer',
            'admin',
            'superadmin',
        ],
        'permission' => [
            'list' => [
                'dashboard.index',

                'user.index',
                'user.create',
                'user.store',
                'user.show',
                'user.edit',
                'user.update',
                'user.delete',

                'rbac.permission.index',
                'rbac.permission.create',
                'rbac.permission.store',
                'rbac.permission.show',
                'rbac.permission.edit',
                'rbac.permission.update',
                'rbac.permission.delete',

                'rbac.role.index',
                'rbac.role.create',
                'rbac.role.store',
                'rbac.role.show',
                'rbac.role.edit',
                'rbac.role.update',
                'rbac.role.delete',

                'translate.index',
                'translate.create',
                'translate.store',
                'translate.show',
                'translate.edit',
                'translate.update',
                'translate.delete',

                'application.setting.index',
                'application.setting.create',
                'application.setting.store',
                'application.setting.show',
                'application.setting.edit',
                'application.setting.update',
                'application.setting.delete',

                'application.type.index',
                'application.type.create',
                'application.type.store',
                'application.type.show',
                'application.type.edit',
                'application.type.update',
                'application.type.delete',

                'blog.index',
                'blog.create',
                'blog.store',
                'blog.show',
                'blog.edit',
                'blog.update',
                'blog.delete',

                'gallery.index',
                'gallery.create',
                'gallery.store',
                'gallery.show',
                'gallery.edit',
                'gallery.update',
                'gallery.delete',

                'log.auth.index',
                'log.auth.show',

                'log.model.index',
                'log.model.show',

                'log.query.index',
                'log.query.show',

                'log.system.index',
                'log.system.show',
            ],
            'superadmin' => 'all',
            'admin' => [
                'dashboard.index',

                'user.index',
                'user.create',
                'user.store',
                'user.show',
                'user.edit',
                'user.update',
                'user.delete',

                'translate.index',
                'translate.show',
                'translate.update',

                'application.setting.index',
                'application.setting.show',
                'application.setting.update',

                'gallery.index',
                'gallery.create',
                'gallery.store',
                'gallery.show',
                'gallery.edit',
                'gallery.update',
                'gallery.delete',

                'blog.index',
                'blog.create',
                'blog.store',
                'blog.show',
                'blog.edit',
                'blog.update',
                'blog.delete',
            ],
            'blogger' => [
                'dashboard.index',

                'blog.index',
                'blog.create',
                'blog.store',
                'blog.show',
                'blog.edit',
                'blog.update',
                'blog.delete',
            ],
            'designer' => [
                'dashboard.index',

                'gallery.index',
                'gallery.create',
                'gallery.store',
                'gallery.show',
                'gallery.edit',
                'gallery.update',
                'gallery.delete',
            ],
            'banned' => [
                'dashboard.index',
            ],
        ]
    ],
];
