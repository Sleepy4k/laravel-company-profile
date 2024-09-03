<?php

namespace App\DataTables;

use Illuminate\Database\Eloquent\Model;

class DataTable
{
    /**
     * Datatable Columns Array
     *
     * @var Array
     */
    protected $datatableColumns;

    /**
     * Datatable Headers Array
     *
     * @var Array
     */
    protected $datatableHeaders;

    /**
     * Datatables Data URL
     *
     * @var String
     */
    protected $datatableUrl;

    /**
     * Datatable Model
     *
     * @var Model
     */
    protected $model;

    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(
        array $datatableColumns,
        array $datatableHeaders,
        string $datatableUrl,
        Model $model
    ) {
        $this->datatableColumns = $datatableColumns;
        $this->datatableHeaders = $datatableHeaders;
        $this->datatableUrl = $datatableUrl;
        $this->model = $model;
    }

    /**
     * Get Datatable Data
     *
     * @return Array
     */
    public function getData() {
        return [
            'columns' => $this->datatableColumns,
            'headers' => $this->datatableHeaders,
            'url' => $this->datatableUrl,
        ];
    }

    /**
     * Get datatables JSON Response
     *
     * @return \Illuminate\Http\Response
     */
    public function datatables() {
        $datatables = datatables()
            ->of($this->model->query())
            ->addIndexColumn()
            ->addColumn('action', function($row) {
                $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">Edit</a>';
                $btn = $btn . ' <a href="javascript:void(0)" class="delete btn btn-danger btn-sm">Delete</a>';
                return $btn;
            })
            ->toArray();

        return response()->json($datatables);
    }
}
