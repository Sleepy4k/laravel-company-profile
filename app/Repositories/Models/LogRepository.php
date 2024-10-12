<?php

namespace App\Repositories\Models;

use App\Enum\ReportLogType;
use App\Contracts\Models\LogInterface;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Database\Eloquent\Model;
use App\Repositories\EloquentRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class LogRepository extends EloquentRepository implements LogInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Base respository constructor
     *
     * @param  Model  $model
     */
    public function __construct(Activity $model)
    {
        $this->model = $model;
    }

    /**
     * Get all in pagination models.
     *
     * @param  int  $paginate
     * @param  array  $columns
     * @param  array  $relations
     * @param  array  $wheres
     * @param  string  $orderBy
     * @param  bool  $latest
     * @param  array  $roles
     * @return Collection|LengthAwarePaginator
     */
    public function paginate(int $paginate = 10, array $columns = ['*'], array $relations = [], array $wheres = [], string $orderBy = 'created_at', bool $latest = true, array $roles = []): Collection|LengthAwarePaginator
    {
        try {
            $model = $this->model->with($relations);

            if (!empty($orderBy)) $model->orderBy($orderBy, $latest ? 'desc' : 'asc');

            if (!empty($wheres)) {
                $isOrCase = false;
                $log_name = 'model';

                foreach ($wheres as $key => $value) {
                    if ($value[0] === 'whereMode') {
                        $isOrCase = $value[1] === 'or';
                        unset($wheres[$key]);
                    } elseif ($value[0] === 'log_name') {
                        $log_name = $value[1];
                        unset($wheres[$key]);
                    }
                }

                $model->where('log_name', $log_name);

                if (!$isOrCase) $model->where($wheres);
                else {
                    $model->where(function ($query) use ($wheres) {
                        foreach ($wheres as $key => $where) {
                            if (count($where) === 2) {
                                $query->orWhere($where[0], $where[1]);
                            } else {
                                $query->orWhere($where[0], $where[1], $where[2]);
                            }
                        }
                    });
                }
            }

            if (!empty($roles)) $model->role($roles);

            return $model->select($columns)->paginate($paginate);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());
            abort(500, $th->getMessage());
        }
    }

    /**
     * Get all searchable fields.
     *
     * @return int
     */
    public function getSearchableFields(): array
    {
        return [
            'description',
            'event',
            'causer_id',
            'causer_type',
            'properties',
        ];
    }
}
