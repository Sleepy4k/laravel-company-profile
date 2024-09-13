<?php

namespace App\Services\Log;

use App\Services\Service;
use App\DataTables\Log\AuthDataTable;
use Spatie\Activitylog\Models\Activity;

class AuthService extends Service
{
    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        $columns = ['id', 'log_name', 'event', 'description', 'causer_type', 'causer_id', 'properties', 'created_at', 'updated_at'];
        $dataTable = new AuthDataTable($this->logInterface);
        $data = $dataTable->getData(10, $columns, [], [['log_name', 'auth']]);
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
        $backUrl = session()->get('log.auth.url') ?? route('log.auth.index');

        return compact('data', 'backUrl');
    }
}
