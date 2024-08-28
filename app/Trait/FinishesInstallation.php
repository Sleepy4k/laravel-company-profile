<?php

namespace App\Trait;

use App\Enum\ReportLogType;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use App\Exceptions\FailedToFinalizeInstallationException;

trait FinishesInstallation
{
    use SystemLog;

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
     */
    protected function finishInstallation()
    {
        $errors = '';

        try {
            Artisan::call('storage:link');
        } catch (\Exception) {
            $errors .= 'Unable to create storage symbolic link.\n';
        }

        // Ensure database already migrated
        try {
            // Query to table migrations to check if already migrated
            DB::table('migrations')->first();
        } catch (\Exception) {
            $errors .= 'Database is not yet migrated, please run `php artisan migrate` first.\n';
        }

        if (!$this->markAsInstalled()) {
            $errors .= 'Unable to create installed file. Please try installation again.\n';
        }

        Artisan::call('optimize');

        if ($errors !== '') {
            $this->sendReportLog(ReportLogType::ERROR, $errors);
            throw new FailedToFinalizeInstallationException($errors);
        }
    }

    /**
     * Migrate the database
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
