<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware('guest')->controller(AuthenticatedSessionController::class)->group(function () {
    Route::get('login', 'create')->name('login');
    Route::post('login', 'store');
});

Route::middleware('auth')->group(function () {
    Route::put('password', PasswordController::class)->name('password.update');
    Route::delete('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
