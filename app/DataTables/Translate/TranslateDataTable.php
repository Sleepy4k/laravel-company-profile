<?php

namespace App\DataTables\Translate;

use App\DataTables\DataTable;
use App\Contracts\Models\LanguageInterface;

class TranslateDataTable extends DataTable
{
    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(LanguageInterface $interface) {
        $this->interface = $interface;
    }
}
