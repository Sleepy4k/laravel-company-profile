<?php

namespace App\DataTables\Log;

use App\Traits\LogReader;
use App\Traits\SystemLog;
use App\Enum\ReportLogType;

class SystemShowDataTable
{
    use SystemLog, LogReader;

    /**
     * The filename of the log file.
     *
     * @var string
     */
    protected $filename = 'laravel';

    /**
     * Data Table constructor
     *
     * @return void
     */
    public function __construct(string $name) {
        $this->filename = $name;
    }

    /**
     * Get the list of files from the laravel app log.
     */
    protected function getSystemLog()
    {
        return collect(
            (object) $this->getFileContent('laravel-' . $this->filename)
        );
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
     */
    public function getData()
    {
        try {
            $data = $this->getSystemLog();

            $search_data = request()->get('search') ?? null;
            $sort_type = request()->get('sort_direction') ?? null;
            $sort_field = request()->get('sort_field') ?? 'created_at';

            if (isset($search_data) && !empty($search_data)) {
                // Because data is not an eloquent model, we can't use the where method
                // but we can use loopings to filter the data, so if search data is similar with the data
                // then we can return the data
                $filteredSearch = [];

                foreach ($data as $key => $value) {
                    $isEnvSimiliar = strpos($value['env'], $search_data) !== false;
                    $isTypeSimiliar = strpos($value['type'], $search_data) !== false;
                    $isMessageSimiliar = strpos($value['message'], $search_data) !== false;
                    $isDateSimiliar = strpos($value['timestamp'], $search_data) !== false;

                    if ($isEnvSimiliar || $isTypeSimiliar || $isMessageSimiliar || $isDateSimiliar) {
                        $filteredSearch[] = $value;
                    }
                }

                return collect($filteredSearch)->paginate(10);
            }

            if ($sort_field && isset($sort_type)) {
                $convertedData = [];
                $sortedData = $data->sortBy($sort_field, SORT_REGULAR, $this->convertSortDirection($sort_type));

                foreach ($sortedData as $key => $value) {
                    $convertedData[] = $value;
                }

                return collect($convertedData)->paginate(10);
            }

            return $data->paginate(10);
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());
            return collect();
        }
    }
}
