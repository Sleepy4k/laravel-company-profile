<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\Application\SettingController;
use App\Http\Controllers\Application\SettingTypeController;

Route::prefix('dashboard')->middleware('auth')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard.index');

    Route::prefix('application')->group(function () {
        Route::get('/{displayMode}', [SettingController::class, 'index'])->name('application.index')->where('displayMode', 'box|table');
        Route::resource('/setting', SettingController::class)->except('index')->names('application')->parameter('setting', 'applicationSetting');
        Route::resource('/type', SettingTypeController::class)->names('application.type')->parameter('type', 'applicationSettingType');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
