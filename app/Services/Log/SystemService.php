<?php

namespace App\Services\Log;

use App\Services\Service;
use App\DataTables\Log\SystemDataTable;
use App\DataTables\Log\SystemShowDataTable;

class SystemService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new SystemDataTable();
        $data = $dataTable->getData();
        $queryParams = request()->query() ?: null;

        return compact('data', 'queryParams');
    }

    /**
     * Display the specified resource.
     *
     * @param string $name
     *
     * @return array
     */
    public function show(string $name): array
    {
        $filename = $name;
        $dataTable = new SystemShowDataTable($name);
        $data = $dataTable->getData();
        $queryParams = request()->query() ?: null;

        return compact('data', 'queryParams', 'filename');
    }
}
