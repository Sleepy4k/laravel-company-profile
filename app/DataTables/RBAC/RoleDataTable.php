<?php

namespace App\DataTables\RBAC;

use App\DataTables\DataTable;
use App\Contracts\Models\RoleInterface;

class RoleDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(RoleInterface $interface) {
        $this->interface = $interface;
    }
}
