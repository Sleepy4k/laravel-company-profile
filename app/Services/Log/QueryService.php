<?php

namespace App\Services\Log;

use App\Services\Service;
use App\DataTables\Log\QueryDataTable;
use App\DataTables\Log\QueryShowDataTable;

class QueryService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new QueryDataTable();
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
        $dataTable = new QueryShowDataTable($name);
        $data = $dataTable->getData();
        $queryParams = request()->query() ?: null;

        return compact('data', 'queryParams', 'filename');
    }
}
