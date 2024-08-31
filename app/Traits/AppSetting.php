<?php

namespace App\Traits;

use App\Enum\ReportLogType;
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

        // Check if the settings are already cached
        if ($this->isAppSettingCached()) {
            return cache('app_settings');
        }

        $appSettings = ApplicationSetting::with('type')->get();

        // If there are no settings, return an empty array
        if ($appSettings->isEmpty()) return [];

        $settings = [];

        foreach ($appSettings as $setting) {
            $settings[$setting->key] = $setting->value;
        }

        $setting['type_name'] = $setting->type->name;

        cache()->forever('app_settings', $settings);
        return $settings;
    }

    /**
     * Check if the application settings are cached
     *
     * @return bool
     */
    protected function isAppSettingCached(): bool
    {
        return cache()->has('app_settings');
    }

    /**
     * Get the application setting
     *
     * @param string $key
     * @param string $default
     *
     * @return string
     */
    protected function getAppSetting(string $key, string $default = ''): string
    {
        // If the application is in first setup, return the default settings
        if ($this->isFirstSetup()) return $default;

        $settings = $this->getAppSettings();

        // if setting is empty, return the default value
        if (empty($settings)) return $default;

        return $settings[$key] ?? $default;
    }

    /**
     * Update the application setting
     *
     * @param string $key
     * @param array $payload
     *
     * @return bool
     */
    protected function updateAppSetting(string $key, array $payload): bool
    {
        if ($this->isFirstSetup()) return false;

        try {
            $setting = ApplicationSetting::where('key', $key)->first();

            if (!$setting) return false;

            $setting->update($payload);

            cache()->forget('app_settings');

            return true;
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());

            return false;
        }
    }
}
