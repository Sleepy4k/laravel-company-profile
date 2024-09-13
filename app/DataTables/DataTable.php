<?php

namespace App\DataTables;

use App\Traits\SystemLog;
use App\Enum\ReportLogType;
use App\Contracts\EloquentInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class DataTable
{
    use SystemLog;

    /**
     * The model interface instance for handling the data.
     *
     * @var EloquentInterface
     */
    protected $interface;

    /**
     * Create a new DataTable instance.
     *
     * @param  EloquentInterface  $interface
     *
     * @return void
     */
    public function __construct(EloquentInterface $interface)
    {
        $this->interface = $interface;
    }

    /**
     * Convert the sort direction.
     *
     * @param  string  $sort_type
     *
     * @return bool
     */
    protected function convertSortDirection(string $sort_type): bool
    {
        return $sort_type === 'desc';
    }

    /**
     * Get the data for the DataTable.
     *
     * @return Collection|LengthAwarePaginator
     */
    public function getData(int $paginate = 10, array $columns = ['*'], array $relations = [], array $wheres = [], string $orderBy = 'created_at', bool $latest = true): Collection|LengthAwarePaginator
    {
        try {
            $search_data = request()->get('search') ?? null;
            $sort_type = request()->get('sort_direction') ?? null;
            $sort_field = request()->get('sort_field') ?? 'created_at';

            if (isset($search_data) && !empty($search_data)) {
                $filteredSearch = [];
                $whereMode = ['whereMode', 'or'];

                foreach ((array) $this->interface->getSearchableFields() as $field) {
                    $filteredSearch[] = [$field, 'like', '%'.$search_data.'%'];
                }

                $filteredSearch[] = $whereMode;
                $search_data = $filteredSearch;
            } else {
                $search_data = [];
            }

            $wheres = array_merge($wheres, $search_data);

            if ($sort_field && isset($sort_type) && !empty($sort_type)) {
                return $this->interface->paginate($paginate, $columns, $relations, $wheres, $sort_field, $this->convertSortDirection($sort_type));
            }

            return $this->interface->paginate($paginate, $columns, $relations, $wheres, $orderBy, $latest);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());
            return collect();
        }
    }
}
