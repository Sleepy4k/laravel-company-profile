<?php

namespace App\Support;

class EnvironmentManager
{
    /**
     * The path to the environment file.
     *
     * @var string
     */
    protected string $envPath;

    /**
     * Initialize new EnvironmentManager instance.
     *
     * @param void
     */
    public function __construct(?string $envPath = null)
    {
        $this->envPath = $envPath ?? base_path('.env');
    }

    /**
     * Save the form content to the .env file.
     *
     * @param Environment $env
     *
     * @return bool
     */
    public function saveEnvFile(Environment $env): bool
    {
        $envContent = file_get_contents($this->envPath);

        $list = [
            'APP_NAME' => strpos($env->getName(), ' ') ? '"' . $env->getName() . '"' : $env->getName(),
            'APP_URL' => $env->getUrl(),
            'DB_HOST' => $env->getDbHost(),
            'DB_PORT' => $env->getDbPort(),
            'DB_DATABASE' => $env->getDbName(),
            'DB_USERNAME' => $env->getDbUser(),
            'DB_PASSWORD' => $env->getDbPassword(),
            'VITE_APP_NAME' => '"${APP_NAME}"'
        ];

        // Change only if existing data is different from the new data
        foreach ($list as $key => $value) {
            $envContent = preg_replace('/'.$key.'=(.*)/', $key.'='.$value, $envContent);
        }

        try {
            file_put_contents($this->envPath, $envContent);

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Guess the application URL
     *
     * @return string
     */
    public static function guestUrl(): string
    {
        $guessedUrl = isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) == 'on' ? 'https' : 'http';
        $guessedUrl .= '://'.$_SERVER['HTTP_HOST'];
        $guessedUrl .= str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);
        $guessedUrl = preg_replace('/install.*/', '', $guessedUrl);

        return rtrim($guessedUrl, '/');
    }
}
