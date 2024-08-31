<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BindServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('App\Contracts\EloquentInterface', 'App\Repositories\EloquentRepository');
        $this->app->bind('App\Contracts\Models\RoleInterface', 'App\Repositories\Models\RoleRepository');
        $this->app->bind('App\Contracts\Models\UserInterface', 'App\Repositories\Models\UserRepository');
        $this->app->bind('App\Contracts\Models\LanguageInterface', 'App\Repositories\Models\LanguageRepository');
        $this->app->bind('App\Contracts\Models\PermissionInterface', 'App\Repositories\Models\PermissionRepository');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
