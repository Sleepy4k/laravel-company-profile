<?php

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Console\Scheduling\Schedule;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: fn() => require __DIR__.'/../routes/install.php'
    )
    ->withEvents(discover: [
        __DIR__.'/../app/Listeners',
    ])
    ->withSchedule(function (Schedule $schedule) {
        $schedule->command('make:sitemap')->daily();
        $schedule->command('activitylog:clean')->daily();
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleAppLanguage::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \App\Http\Middleware\PreventInstallationWhenInstalled::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'prevent_installation' => \App\Http\Middleware\PreventInstallationWhenInstalled::class,
        ]);

        $middleware->redirectGuestsTo('/');
        $middleware->redirectUsersTo(function () {
            return route('dashboard.index');
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (!$request->inertia()) return $response;

            if (!app()->environment(['local', 'testing'])) {
                return inertia('Error', [
                        'status' => $response->getStatusCode(),
                        'title' => trans('error.'.$response->getStatusCode().'.title'),
                        'description' => trans('error.'.$response->getStatusCode().'.description'),
                        'home' => trans('error.back_home')
                    ])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
