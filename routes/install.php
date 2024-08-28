<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Install\UserController;
use App\Http\Controllers\Install\SetupController;
use App\Http\Controllers\Install\DatabaseController;
use App\Http\Controllers\Install\FinishedController;
use App\Http\Controllers\Install\FinalizeController;
use App\Http\Controllers\Install\PermissionController;
use App\Http\Controllers\Install\RequirementController;
use App\Http\Controllers\Install\StorageLinkController;

Route::prefix('install')->group(function () {
    Route::get('', RequirementController::class)->name('install.requirements');
    Route::get('permissions', PermissionController::class)->name('install.permissions');

    Route::resource('setup', SetupController::class)->only(['index', 'store'])->names([
        'index' => 'install.setup',
        'store' => 'install.setup.store',
    ]);

    Route::get('database', DatabaseController::class)->name('install.database');

    Route::resource('user', UserController::class)->only(['index', 'store'])->names([
        'index' => 'install.user',
        'store' => 'install.user.store',
    ]);

    Route::get('finalize', FinalizeController::class)->name('install.finalize');
    Route::get('finish', FinishedController::class)->name('install.finished');
    Route::post('link', StorageLinkController::class)->name('install.link');
});
