<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

class UninstallProjectCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'naka:uninstall';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Uninstall Current Project';

    /**
     * The list of file that will be ignored.
     *
     * @var array
     */
    protected $ignoreFileList = [
        '.gitignore',
        '.gitkeep',
        'index.html',
    ];

    /**
     * The list of file that will be deleted.
     *
     * @var array
     */
    protected $installedFileList = [
        '.lang',
        '.steps',
        '.installed',
    ];

    /**
     * The list of folder that will be deleted.
     *
     * @var array
     */
    protected $storageFolderList = [
        'logs',
        'app/public',
    ];

    /**
     * Check if file is ignored.
     *
     * @param string $file
     *
     * @return bool
     */
    protected function isFileIgnored($file)
    {
        // If file name has slash, then get the last part
        $file = explode('/', $file);
        $file = end($file);

        return in_array($file, $this->ignoreFileList);
    }

    /**
     * Delete installed file.
     */
    protected function deleteInstalledFile()
    {
        foreach ($this->installedFileList as $file) {
            $path = storage_path($file);

            if (file_exists($path) && !$this->isFileIgnored($file)) {
                unlink($path);
            }
        }
    }

    /**
     * Delete storage folder.
     */
    protected function deleteStorageFolder()
    {
        foreach ($this->storageFolderList as $folder) {
            $path = storage_path($folder);
            $files = glob($path . '/*');

            foreach ($files as $file) {
                if ($this->isFileIgnored($file)) continue;

                if (is_dir($file)) {
                    // Check if folder not empty
                    if (count(glob($file . '/*'))) {
                        $tempFiles = glob($file . '/*');

                        foreach ($tempFiles as $tempFile) {
                            if (!$this->isFileIgnored($tempFile)) {
                                unlink($tempFile);
                            }
                        }
                    }

                    rmdir($file);
                } else {
                    unlink($file);
                }
            }
        }
    }

    /**
     * Delete .env file.
     */
    protected function deleteEnv()
    {
        $path = base_path('.env');

        if (file_exists($path)) unlink($path);
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Dropping all tables...');

        try {
            $this->call('migrate:reset');
            if (Schema::hasTable('migrations')) Schema::drop('migrations');
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        } finally {
            $this->info('Tables dropped successfully.');
        }

        $this->info('Clearing all caches...');

        try {
            $this->call('optimize:clear');
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        } finally {
            $this->info('Caches cleared successfully.');
        }

        $this->info('Uninstalling project...');

        try {
            $this->deleteInstalledFile();
            $this->deleteStorageFolder();
            $this->deleteEnv();
        } catch (\Throwable $th) {
            $this->error($th->getMessage());
        } finally {
            $this->info('Project uninstalled successfully.');
        }
    }
}
