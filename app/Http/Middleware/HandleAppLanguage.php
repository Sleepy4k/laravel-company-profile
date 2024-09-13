<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleAppLanguage
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isUserLoggedIn = auth('web')->check();
        $isUserHasLang = session()->has('user.lang');
        $isFileExists = file_exists(storage_path('.lang'));

        if ($isUserLoggedIn && $isFileExists) {
            $lang = file_get_contents(storage_path('.lang'));
            app()->setLocale($lang);
        } elseif (!$isUserLoggedIn && $isUserHasLang) {
            app()->setLocale(session()->get('user.lang'));
        } elseif (!$isUserLoggedIn && !$isUserHasLang) {
            $lang = $isFileExists ? file_get_contents(storage_path('.lang')) : config('app.locale');
            app()->setLocale($lang);
        } else {
            app()->setLocale(config('app.locale'));
        }

        return $next($request);
    }
}
