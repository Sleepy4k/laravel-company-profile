<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\DashboardController;
use App\Policies\Application\SettingTypePolicy;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\Application\SettingController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix('dashboard')->middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard.index');

    Route::prefix('application')->group(function () {
        Route::resource('/', SettingController::class)->names('application')->parameter('', 'application');
        Route::resource('/type', SettingTypePolicy::class)->names('application.type');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__.'/install.php';
