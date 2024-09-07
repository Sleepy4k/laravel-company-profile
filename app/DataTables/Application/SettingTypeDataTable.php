<?php

namespace App\DataTables\Application;

use App\DataTables\DataTable;
use App\Contracts\Models\ApplicationSettingTypeInterface;

class SettingTypeDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(ApplicationSettingTypeInterface $interface) {
        $this->interface = $interface;
    }
}
