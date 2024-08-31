<?php

namespace App\Console\Commands;

use Illuminate\Support\Arr;
use Illuminate\Console\Command;

class PreSetupCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $url;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $rootDir;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $envPath;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $envExamplePath;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'naka:pre-setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pre setup the project before running the application for the first time';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->url = "http://localhost:8000";
        $this->rootDir = rtrim(base_path(), DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR;
        $this->envPath = $this->rootDir.'.env';
        $this->envExamplePath = $this->rootDir.'.env.example';
    }

    /**
     * Check whether the .env file exist.
     *
     * @return bool
     */
    private function envFileExist(): bool
    {
        return file_exists($this->envPath);
    }

    /**
     * Check whether the .env.example file exist.
     *
     * @return bool
     */
    private function envExampleFileExist(): bool
    {
        return file_exists($this->envExamplePath);
    }

    /**
     * Generate random application key.
     *
     * @return string
     */
    private function generateAppRandomKey(): string
    {
        return 'base64:'.base64_encode(random_bytes(32));
    }

    /**
     * Write the key in the environment file.
     *
     * @param string $key
     *
     * @return void
     */
    private function writeKeyInEnvironmentFile(string $key): void
    {
        file_put_contents($this->envPath, preg_replace(
            '/^APP_KEY=.*/m',
            'APP_KEY='.$key,
            file_get_contents($this->envPath)
        ));
    }

    /**
     * Write the APP_URL value in the environment file.
     *
     * @param string $url
     *
     * @return void
     */
    private function writeUrlInEnvironmentFile(string $url): void
    {
        file_put_contents($this->envPath, preg_replace(
            '/^APP_URL=.*/m',
            'APP_URL='.$url,
            file_get_contents($this->envPath)
        ));
    }

    /**
     * Get cached config value.
     *
     * @param string $key
     *
     * @return mixed
     */
    private function getCachedConfigValue(string $key): mixed
    {
        if (file_exists($this->rootDir.'bootstrap/cache/config.php')) {
            $config = include $this->rootDir.'bootstrap/cache/config.php';

            if (! empty($config)) {
                return ! empty(Arr::get($config, $key)) ? Arr::get($config, $key) : '';
            }
        }

        return '';
    }

    /**
     * Get config value from .env.
     *
     * @param string $envKey
     *
     * @return string
     */
    private function getEnvConfigValue(string $envKey): string
    {
        // Read .env file into $_ENV
        try {
            \Dotenv\Dotenv::create(
                \Illuminate\Support\Env::getRepository(),
                $this->rootDir
            )->load();
        } catch (\Exception) {
            // Do nothing
        }

        return ! empty($_ENV[$envKey]) ? $_ENV[$envKey] : '';
    }

    /**
     * Clear the application config cache.
     *
     * @return void
     */
    private function clearConfigCache(): void
    {
        if (file_exists($this->rootDir.'bootstrap/cache/config.php')) {
            unlink($this->rootDir.'bootstrap/cache/config.php');
        }
    }

    /**
     * Show installer error.
     *
     * @param string $msg
     *
     * @return never
     */
    private function showPreInstallError(string $msg): never
    {
        echo $msg;
        exit;
    }

    /**
     * Create the initial .env file if not exist.
     *
     * @return void
     */
    protected function createEnvFileIfNotExists(): void
    {
        // Check if .env.example exists
        if ($this->envFileExist()) {
            return;
        }

        if (! $this->envExampleFileExist()) {
            $this->showPreInstallError(
                'File .env.example not found. Please make sure to copy this file from the downloaded files.'
            );
        }

        // Copy .env.example
        copy($this->envExamplePath, $this->envPath);

        if (! $this->envFileExist()) {
            $this->showPermissionsError();
        }
    }

    /**
     * Make sure that the needed keys are present in the .env file
     *
     * @param string $key
     *
     * @return void
     */
    private function makeSureEmptyKeyIsPresent(string $key): void
    {
        // Add APP_KEY= to the .env file if needed
        // Without APP_KEY= the key will not be saved
        if (! preg_match('/^'.$key.'=/m', file_get_contents($this->envPath))) {
            if (! file_put_contents($this->envPath, PHP_EOL.$key.'=', FILE_APPEND)) {
                $this->showPermissionsError();
            }
        }
    }

    /**
     * Get the current process user
     *
     * @return string
     */
    private function getCurrentProcessUser(): string
    {
        return !function_exists('posix_getpwuid') ? get_current_user() : posix_getpwuid(posix_geteuid())['name'];
    }

    /**
     * Helper function to show permissions error
     *
     * @return never
     */
    private function showPermissionsError(): never
    {
        $rootDirNoSlash = rtrim($this->rootDir, DIRECTORY_SEPARATOR);

        // Show error on console
        $this->showPreInstallError('
            Web installer could not write data into '.$this->envPath.' file. Please give your web server user ('.$this->getCurrentProcessUser().') write permissions in:
            sudo chown '.$this->getCurrentProcessUser().':'.$this->getCurrentProcessUser().' -R '.$rootDirNoSlash.'
            sudo find '.$rootDirNoSlash.' -type d -exec chmod 755 {} \;
            sudo find '.$rootDirNoSlash.' -type f -exec chmod 644 {} \;
        ');
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle(): void
    {
        $this->info('Performing pre setup...');

        // Create the .env file if not exist
        $this->createEnvFileIfNotExists();

        // get the APP_KEY from the .env file and key from the cached config
        $appKey = $this->getEnvConfigValue('APP_KEY');
        $cachedAppKey = $this->getCachedConfigValue('app.key');

        // Make sure that the APP_KEY is present in the .env file
        $this->makeSureEmptyKeyIsPresent('APP_KEY');

        // Generate a new key if the APP_KEY is empty
        if (!empty($cachedAppKey) && empty($appKey)) {
            $this->writeKeyInEnvironmentFile($cachedAppKey);
        } else if (!empty($appKey) && empty($cachedAppKey)) {
            $this->writeKeyInEnvironmentFile($appKey);
        } else if (empty($appKey) || empty($cachedAppKey)) {
            $appKey = $this->generateAppRandomKey();
            $this->writeKeyInEnvironmentFile($appKey);
        }

        // Make sure that the APP_URL is present in the .env file
        $this->makeSureEmptyKeyIsPresent('APP_URL');

        // Write the APP_URL value in the .env file
        $this->writeUrlInEnvironmentFile($this->url);

        // Clear the application config cache
        $this->clearConfigCache();

        $this->info('Project has been pre setup.');

        $this->info('Clearing application cache');

        // Clear the application cache
        $this->call('naka:optimize');

        $this->info('Application cache has been cleared.');
    }
}
