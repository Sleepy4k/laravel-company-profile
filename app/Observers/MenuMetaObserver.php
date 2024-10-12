<?php

namespace App\Observers;

use App\Models\MenuMeta;

class MenuMetaObserver
{
    /**
     * Handle the menuMeta "creating" event.
     */
    public function creating(MenuMeta $menuMeta): void
    {
        $menuMeta->uuid = \Illuminate\Support\Str::uuid();
    }
}
