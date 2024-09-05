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

            Artisan::call('db:seed', ['--class' => 'TranslateSeeder']);
            Artisan::call('db:seed', ['--class' => 'ApplicationSettingTypeSeeder']);
            Artisan::call('db:seed', ['--class' => 'ApplicationSettingSeeder']);
        } catch (\Exception $e) {
            throw new \Exception('Could not migrate database: '.$e->getMessage());
        }
    }
}
