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
        // Only when server environment is production
        if ($this->app->environment('production')) {
            Gate::before(function ($user, $ability) {
                return $user->hasRole('superadmin') ? true : null;
            });
        }

        // Register policies for non-models
        Gate::policy('App\Policies\Log\HomePolicy', \App\Policies\Log\HomePolicy::class);
        Gate::policy('App\Policies\Log\AuthPolicy', \App\Policies\Log\AuthPolicy::class);
        Gate::policy('App\Policies\Log\ModelPolicy', \App\Policies\Log\ModelPolicy::class);
        Gate::policy('App\Policies\Log\QueryPolicy', \App\Policies\Log\QueryPolicy::class);
        Gate::policy('App\Policies\Log\SystemPolicy', \App\Policies\Log\SystemPolicy::class);
        Gate::policy('App\Policies\Translate\LanguagePolicy', \App\Policies\Translate\LanguagePolicy::class);

        // Register policies for models
        Gate::policy(\App\Models\ApplicationSetting::class, \App\Policies\Application\SettingPolicy::class);
        Gate::policy(\App\Models\ApplicationSettingType::class, \App\Policies\Application\SettingTypePolicy::class);
        Gate::policy(\App\Models\Translate::class, \App\Policies\Translate\TranslatePolicy::class);
    }
}
