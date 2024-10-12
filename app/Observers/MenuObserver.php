<?php

namespace App\Observers;

use App\Models\Menu;

class MenuObserver
{
    /**
     * Handle the menu "creating" event.
     */
    public function creating(Menu $menu): void
    {
        $menu->uuid = \Illuminate\Support\Str::uuid();
    }
}
