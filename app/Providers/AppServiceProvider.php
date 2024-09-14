<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
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
        JsonResource::withoutWrapping();

        RateLimiter::for('web', function (Request $request) {
            return Limit::perMinute(30)->by(optional($request->user())->id ?: $request->ip())->response(function () use ($request) {
                if ($request->inertia()) return inertia('Error', ['status' => 429])
                    ->toResponse($request)
                    ->setStatusCode(429);

                abort(429, 'Too Many Requests');
            });
        });
    }
}
