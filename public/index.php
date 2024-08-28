<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Check if environment is missing
if (!file_exists(__DIR__.'/../.env')) {
    header('Location: /pre-setup.html?auth=system');
    exit;
}

// Check if the application is requiring installation
if (!file_exists(__DIR__.'/../storage/.installed')) {
    if (!strpos($_SERVER['REQUEST_URI'], 'install') !== false) {
        header('Location: /install');
        exit;
    }
}

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
