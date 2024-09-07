<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Traits\AppSetting;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    use AppSetting;

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        view()->share('app_name', !empty($this->getAppSetting('app_name')) ? $this->getAppSetting('app_name') : config('app.name'));
        view()->share('app_logo', $this->getAppSetting('app_logo'));
        view()->share('app_favicon', $this->getAppSetting('app_favicon'));
        view()->share('app_author', $this->getAppSetting('app_meta_author', 'benjamin4k'));
        view()->share('app_description', $this->getAppSetting('app_meta_description'));
        view()->share('app_keyword', $this->getAppSetting('app_meta_keyword'));

        RateLimiter::for('web', function (Request $request) {
            return Limit::perMinute(30)->by(optional($request->user())->id ?: $request->ip())->response(function () use ($request) {
                if ($request->inertia()) return Inertia::render('Error', ['status' => 429])
                    ->toResponse($request)
                    ->setStatusCode(429);

                abort(429, 'Too Many Requests');
            });
        });
    }
}
