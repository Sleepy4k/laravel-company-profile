<?php

namespace App\DataTables\User;

use App\DataTables\DataTable;
use App\Contracts\Models\UserInterface;

class UserDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(UserInterface $interface) {
        $this->interface = $interface;
    }
}
