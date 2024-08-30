<?php

namespace App\Services\Install;

use App\Services\Service;
use Illuminate\Support\Facades\Artisan;

class StorageService extends Service
{
    /**
     * Handle the incoming request.
     *
     * @return void
     */
    public function invoke(): void
    {
        try {
            // Clear the cache
            Artisan::call('cache:clear');
            Artisan::call('config:clear');

            // Check if the storage link exists
            if (!file_exists(public_path('storage'))) {
                // Create a symbolic link from "public/storage" to "storage/app/public"
                Artisan::call('storage:link');
            }
        } catch (\Exception $e) {
            throw new \Exception('Could not set up storage: '.$e->getMessage());
        }
    }
}
