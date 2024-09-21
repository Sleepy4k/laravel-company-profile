<?php

namespace App\Services\Auth;

use App\Services\Service;
use Illuminate\Support\Facades\RateLimiter;

class AuthenticatedSessionService extends Service
{
    /**
     * Show the form for creating a new resource.
     *
     * @return array
     */
    public function create(): array
    {
        $status = session('status');
        $rateLimiter = [
            'max_attempts' => config('auth.defaults.max_attempts'),
            'attempts' => RateLimiter::attempts('login'.request()->ip()),
            'remaining' => RateLimiter::remaining('login'.request()->ip(), config('auth.defaults.max_attempts')),
            'reset_at' => RateLimiter::availableIn('login'.request()->ip()),
        ];

        return compact('status', 'rateLimiter');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param array $request
     *
     * @return void
     */
    public function store(array $request): void
    {
        /** @var \Illuminate\Database\Eloquent\Model|int|string|null $user */
        $user = auth('web')->user() ?? null;

        if (!$user) return;

        unset($request['password']);

        activity('auth')
            ->event('login')
            ->causedBy($user)
            ->withProperties(array_merge($request, [
                'name' => $user->name,
                'logged_in_at' => now()->toDateTimeString(),
            ]))
            ->log('User ' . $user->name . ' successfully logged in');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return void
     */
    public function destroy(): void
    {
        /** @var \Illuminate\Database\Eloquent\Model|int|string|null $user */
        $user = auth('web')->user() ?? null;

        if (!$user) return;

        activity('auth')
            ->event('logout')
            ->causedBy($user)
            ->withProperties([
                'name' => $user->name,
                'email' => $user->email,
                'logged_out_at' => now()->toDateTimeString(),
            ])
            ->log('User ' . $user->name . ' successfully logged out');

        auth('web')->logout();
    }
}
