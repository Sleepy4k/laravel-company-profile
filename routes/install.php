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

Route::prefix('install')->as('install.')->middleware('prevent_installation')->group(function () {
    Route::get('', RequirementController::class)->name('requirements');
    Route::get('permissions', PermissionController::class)->name('permissions');
    Route::get('database', DatabaseController::class)->name('database');
    Route::get('finalize', FinalizeController::class)->name('finalize');
    Route::get('finish', FinishedController::class)->name('finished');
    Route::post('link', StorageLinkController::class)->name('link');

    Route::resource('setup', SetupController::class)->only(['index', 'store'])->name('index', 'setup');
    Route::resource('user', UserController::class)->only(['index', 'store'])->name('index', 'user');
});
