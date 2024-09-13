<?php

namespace App\Services\Log;

use App\Services\Service;
use App\DataTables\Log\ModelDataTable;
use Spatie\Activitylog\Models\Activity;

class ModelService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $dataTable = new ModelDataTable($this->logInterface);
        $data = $dataTable->getData(10, ['*'], [], [['log_name', 'model']]);
        $queryParams = request()->query() ?: null;

        return compact('data', 'queryParams');
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return array
     */
    public function show(Activity $data): array
    {
        $backUrl = session()->get('log.model.url') ?? route('log.model.index');

        return compact('data', 'backUrl');
    }
}
