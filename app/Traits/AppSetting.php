<?php

namespace App\Traits;

use App\Models\ApplicationSetting;

trait AppSetting
{
    use SystemLog;

    /**
     * Check if the application is in first setup
     *
     * @return bool
     */
    protected function isFirstSetup(): bool
    {
        return !file_exists(storage_path('.installed'));
    }

    /**
     * Get the application settings
     *
     * @return array
     */
    protected function getAppSettings(): array
    {
        // If the application is in first setup, return the default settings
        if ($this->isFirstSetup()) return [
            'app_name' => config('app.name'),
            'app_description' => '',
            'app_logo' => '',
            'app_favicon' => '',
        ];

        $settings = ApplicationSetting::select('key', 'value')
            ->get()
            ->mapWithKeys(function ($setting) {
                return [$setting->key => $setting->value];
            })
            ->toArray();

        return $settings;
    }

    /**
     * Get the application setting
     *
     * @param string $key
     *
     * @return string
     */
    protected function getAppSetting(string $key): string
    {
        $settings = $this->getAppSettings();

        return $settings[$key] ?? '';
    }
}
