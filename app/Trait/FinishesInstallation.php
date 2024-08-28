<?php

namespace App\Trait;

use App\Enum\ReportLogType;
use Illuminate\Support\Facades\Artisan;
use App\Exceptions\FailedToFinalizeInstallationException;

trait FinishesInstallation
{
    use SystemLog;

    /**
     * Mark the application as installed.
     *
     * @return bool
     */
    private function markAsInstalled(): bool
    {
        $path = storage_path('.installed');

        if (!file_exists($path)) {
            $bytes = file_put_contents($path, 'Installed at: '.date('Y-m-d H:i:s').PHP_EOL.'Version: '.config('app.version', '1.0.0').PHP_EOL);
            return $bytes !== false;
        }

        return false;
    }

    /**
     * Finish the installation process.
     * 
     * @throws FailedToFinalizeInstallationException
     * 
     * @return void
     */
    protected function finishInstallation(): void
    {
        $errors = '';

        if (!$this->markAsInstalled()) {
            $errors .= 'Unable to create installed file. Please try installation again.\n';
        }

        if ($errors !== '') {
            $this->sendReportLog(ReportLogType::ERROR, $errors);
            throw new FailedToFinalizeInstallationException($errors);
        }
    }

    /**
     * Migrate the database
     * 
     * @return void
     */
    protected function migrate(): void
    {
        Artisan::call('migrate --force');
    }

    /**
     * Check if the database is already migrated
     */
    protected function isAlreadyMigrated(): bool
    {
        return Artisan::call('migrate:status') === 0;
    }

}
