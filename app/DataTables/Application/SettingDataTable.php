<?php

namespace App\DataTables\Application;

use App\DataTables\DataTable;
use App\Contracts\Models\ApplicationSettingInterface;

class SettingDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(ApplicationSettingInterface $interface) {
        $this->interface = $interface;
    }
}
