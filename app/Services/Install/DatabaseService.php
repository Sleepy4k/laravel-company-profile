<?php

namespace App\Services\Install;

use App\Services\Service;
use App\Traits\FinishesInstallation;
use Illuminate\Support\Facades\Artisan;

class DatabaseService extends Service
{
    use FinishesInstallation;

    /**
     * Handle the incoming request.
     *
     * @return void
     */
    public function invoke(): void
    {
        try {
            // if not already migrated then migrate
            if (!$this->isAlreadyMigrated()) $this->migrate();

            // Instead of adding seeder each class, we just call db:seed command
            // Just add condition on seeder answell to prevent unused data
            Artisan::call('db:seed');
        } catch (\Exception $e) {
            throw new \Exception('Could not migrate database: '.$e->getMessage());
        }
    }
}
