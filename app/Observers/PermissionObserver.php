<?php

namespace App\Observers;

use App\Models\Permission;

class PermissionObserver
{
    /**
     * Handle the ApplicationSetting "creating" event.
     */
    public function creating(Permission $permission): void
    {
        $permission->uuid = \Illuminate\Support\Str::uuid();
    }
}
