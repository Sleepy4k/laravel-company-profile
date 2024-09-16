<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Define the base path for the application, so that we can use it in the future (e.g. for deployment)
$BASE_PATH = __DIR__.'/..';

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = $BASE_PATH.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Check if environment is missing
if (!file_exists($BASE_PATH.'/.env')) {
    if (!strpos($_SERVER['REQUEST_URI'], 'pre-setup') !== false) {
        header('Location: /pre-setup.html');
        exit;
    }
}

// Register the Composer autoloader...
require $BASE_PATH.'/vendor/autoload.php';

// Check if the application is requiring installation
if (!file_exists($BASE_PATH.'/storage/.installed')) {
    if (!strpos($_SERVER['REQUEST_URI'], 'install') !== false) {
        header('Location: /install');
        exit;
    }
}

// Bootstrap Laravel and handle the request...
(require_once $BASE_PATH.'/bootstrap/app.php')
    ->handleRequest(Request::capture());
