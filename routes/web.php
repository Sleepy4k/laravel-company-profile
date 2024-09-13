<?php

use Inertia\Inertia;
use App\Http\Controllers\Error;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

require __DIR__.'/auth.php';
require __DIR__.'/dashboard.php';

Route::fallback(Error\FallbackController::class);
