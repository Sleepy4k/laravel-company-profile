<?php

namespace App\Services\Install;

use App\Services\Service;
use App\Trait\FinishesInstallation;

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
        } catch (\Exception $e) {
            throw new \Exception('Could not migrate database: '.$e->getMessage());
        }
    }
}
