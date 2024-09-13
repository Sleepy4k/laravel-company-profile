<?php

namespace App\DataTables\Log;

use App\DataTables\DataTable;
use App\Contracts\Models\LogInterface;

class AuthDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(LogInterface $interface) {
        $this->interface = $interface;
    }
}
