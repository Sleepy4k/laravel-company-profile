<?php

namespace App\Observers;

use App\Models\ApplicationSettingType;

class ApplicationSettingTypeObserver
{
    /**
     * Handle the ApplicationSettingType "creating" event.
     */
    public function creating(ApplicationSettingType $applicationSettingType): void
    {
        $applicationSettingType->uuid = \Illuminate\Support\Str::uuid();
    }
}
