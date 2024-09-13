<?php

namespace App\Providers;

use Illuminate\Support\Collection;
use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\LengthAwarePaginator;

class BindServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind('App\Contracts\EloquentInterface', 'App\Repositories\EloquentRepository');
        $this->app->bind('App\Contracts\Models\LogInterface', 'App\Repositories\Models\LogRepository');
        $this->app->bind('App\Contracts\Models\RoleInterface', 'App\Repositories\Models\RoleRepository');
        $this->app->bind('App\Contracts\Models\UserInterface', 'App\Repositories\Models\UserRepository');
        $this->app->bind('App\Contracts\Models\LanguageInterface', 'App\Repositories\Models\LanguageRepository');
        $this->app->bind('App\Contracts\Models\PermissionInterface', 'App\Repositories\Models\PermissionRepository');
        $this->app->bind('App\Contracts\Models\ApplicationSettingInterface', 'App\Repositories\Models\ApplicationSettingRepository');
        $this->app->bind('App\Contracts\Models\ApplicationSettingTypeInterface', 'App\Repositories\Models\ApplicationSettingTypeRepository');
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Collection::macro('paginate', function ($perPage = 15, $pageName = 'page', $page = null, $options = []) {
            $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);
            $options['path'] = LengthAwarePaginator::resolveCurrentPath();
            $data = $this->forPage($page, $perPage)->values();

            return new LengthAwarePaginator(
                $data,
                $this->count(),
                $perPage,
                $page,
                $options
            );
        });
    }
}
