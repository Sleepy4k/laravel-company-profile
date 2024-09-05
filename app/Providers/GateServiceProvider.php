<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class GateServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Gate::before(function ($user, $ability) {
        //     return $user->hasRole('superadmin') ? true : null;
        // });

        Gate::policy(\App\Models\ApplicationSetting::class, \App\Policies\Application\SettingPolicy::class);
        Gate::policy(\App\Models\ApplicationSettingType::class, \App\Policies\Application\SettingTypePolicy::class);
    }
}
