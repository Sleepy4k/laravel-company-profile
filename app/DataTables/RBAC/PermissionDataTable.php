<?php

namespace App\DataTables\RBAC;

use App\DataTables\DataTable;
use App\Contracts\Models\PermissionInterface;

class PermissionDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(PermissionInterface $interface) {
        $this->interface = $interface;
    }
}
