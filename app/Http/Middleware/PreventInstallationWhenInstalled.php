<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventInstallationWhenInstalled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->route()->getName() === 'install.finished' || $request->route()->getName() === 'install.link') {
            /**
             * Uses signed URL Laravel feature as when the installation
             * is finished the installed file will be created and if this action
             * is in the PreventInstallationWhenInstalled middleware, it will show 404 error as the installed
             * file will exists but we need to show the user that the installation is finished
             */
            if (!$request->hasValidSignature()) {
                if ($request->expectsJson()) return response()->json(['message' => 'Not Found'], 404);
                return inertia('Error', [
                    'status' => 404,
                    'title' => 'Not Found',
                    'description' => 'We are sorry, but the page you requested was not found',
                    'home' => 'Back to home'
                ])
                ->toResponse($request)
                ->setStatusCode(404);
            }

            return $next($request);
        }

        if (file_exists(storage_path('.installed')) && $request->is('install*') ) {
            if ($request->expectsJson()) return response()->json(['message' => 'Not Found'], 404);
            return inertia('Error', [
                'status' => 404,
                'title' => 'Not Found',
                'description' => 'We are sorry, but the page you requested was not found',
                'home' => 'Back to home'
            ])
            ->toResponse($request)
            ->setStatusCode(404);
        }

        return $next($request);

    }
}
