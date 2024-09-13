<?php

namespace App\Observers;

use App\Models\Translate;

class TranslateObserver
{
    /**
     * Handle the ApplicationSetting "creating" event.
     */
    public function creating(Translate $translate): void
    {
        $translate->uuid = \Illuminate\Support\Str::uuid();
    }
}
