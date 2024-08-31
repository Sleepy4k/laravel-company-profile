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
            switch ($type) {
            case ReportLogType::DEBUG:
                Log::debug($message);
                break;
            case ReportLogType::ERROR:
                Log::error($message);
                break;
            case ReportLogType::ALERT:
                Log::alert($message);
                break;
            case ReportLogType::INFO:
                Log::info($message);
                break;
            case ReportLogType::WARNING:
                Log::warning($message);
                break;
            default:
                Log::info($message);
                break;
            }

            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}
