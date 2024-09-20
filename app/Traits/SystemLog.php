<?php

namespace App\Traits;

use App\Enum\ReportLogType;
use Illuminate\Support\Facades\Log;

trait SystemLog
{
    /**
     * Send report to system log
     *
     * @param ReportLogType $type
     * @param string $message
     *
     * @return bool
     */
    protected function sendReportLog(ReportLogType $type, string $message): bool
    {
        try {
            match ($type) {
                ReportLogType::DEBUG => Log::debug($message),
                ReportLogType::ERROR => Log::error($message),
                ReportLogType::ALERT => Log::alert($message),
                ReportLogType::INFO => Log::info($message),
                ReportLogType::WARNING => Log::warning($message),
                default => Log::info($message),
            };

            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
