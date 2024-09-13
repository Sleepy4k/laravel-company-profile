<?php

namespace App\Observers;

use App\Models\ApplicationSetting;

class ApplicationSettingObserver
{
    /**
     * Handle the ApplicationSetting "creating" event.
     */
    public function creating(ApplicationSetting $applicationSetting): void
    {
        $applicationSetting->uuid = \Illuminate\Support\Str::uuid();
    }
}
