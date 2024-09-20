<?php

namespace App\Observers;

use App\Models\Role;

class RoleObserver
{
    /**
     * Handle the ApplicationSetting "creating" event.
     */
    public function creating(Role $role): void
    {
        $role->uuid = \Illuminate\Support\Str::uuid();
    }
}
