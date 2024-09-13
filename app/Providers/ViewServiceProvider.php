<?php

namespace App\Providers;

use App\Traits\AppSetting;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    use AppSetting;

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
        view()->share('app_name', !empty($this->getAppSetting('app_name')) ? $this->getAppSetting('app_name') : config('app.name'));
        view()->share('app_logo', $this->getAppSetting('app_logo'));
        view()->share('app_favicon', $this->getAppSetting('app_favicon'));
        view()->share('app_author', $this->getAppSetting('app_meta_author', 'benjamin4k'));
        view()->share('app_description', $this->getAppSetting('app_meta_description'));
        view()->share('app_keyword', $this->getAppSetting('app_meta_keyword'));
    }
}
