<?php

namespace App\Trait;

use App\Enum\LogReaderType;
use App\Enum\ReportLogType;
use Illuminate\Support\Facades\File;

trait LogReader
{
    use SystemLog;

    /**
     * Get file list from laravel app log
     *
     * @param LogReaderType $type
     * @param string $channel
     *
     * @return array
     */
    protected function getFileList(LogReaderType $type = LogReaderType::SINGLE, string $channel = 'laravel'): array
    {
        $logs = [];

        try {
            switch ($type) {
            case LogReaderType::DAILY:
                $files = glob(storage_path('logs/' . $channel . '-*.log'));
                $files = array_reverse($files);
                break;
            case LogReaderType::SINGLE:
                $files = glob(storage_path('logs/' . $channel . '.log'));
                break;
            default:
                $files = glob(storage_path('logs/' . $channel . '.log'));
                break;
            }

            foreach ($files as $file) {
                $name = explode("/", $file)[1];
                $size = File::size(storage_path('logs/' . $name));
                $timestamp = File::lastModified(storage_path('logs/' . $name));
                $type = File::type(storage_path('logs/' . $name));
                $content = File::mimeType(storage_path('logs/' . $name));

                $logs[] = [
                    'name' => $name,
                    'size' => formatFileSize($size),
                    'type' => $type,
                    'content' => $content,
                    'last_updated' => date('Y-m-d H:i:s', $timestamp),
                ];
            }
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());
        }

        return $logs;
    }

    /**
     * Read file content from laravel app log
     *
     * @param date $date
     *
     * @return array
     */
    protected function getFileContent($date): array
    {
        $logs = [];

        try {
            $content = file_get_contents(storage_path('logs/' . $date . '.log'));
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, 'file not found in our storage, please double check it. '.$th->getMessage());
            return $logs;
        }

        try {
            $pattern = "/^\[(?<date>.*)\]\s(?<env>\w+)\.(?<type>\w+):(?<message>.*)/m";

            preg_match_all($pattern, $content, $matches, PREG_SET_ORDER, 0);

            foreach ($matches as $match) {
                $logs[] = [
                    'env' => $match['env'],
                    'type' => $match['type'],
                    'timestamp' => $match['date'],
                    'message' => trim($match['message'])
                ];
            }
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());
        }

        return $logs;
    }

    /**
     * Read all file content from laravel app log
     *
     * @param LogReaderType $type
     * @param string $channel
     * @param date $date
     *
     * @return array
     */
    protected function getAllFileContent(LogReaderType $type = LogReaderType::SINGLE, $channel = 'laravel', $date = null): array
    {
        $logs = [];
        $content = null;
        $pattern = null;

        try {
            switch ($type) {
            case LogReaderType::DAILY:
                $date = $date ?? formatDate(now(), 'Y-m-d');
                $content = file_get_contents(storage_path('logs/' . $channel . '-' . $date . '.log'));
                break;
            case LogReaderType::SINGLE:
                $content = file_get_contents(storage_path('logs/' . $channel . '.log'));
                break;
            default:
                $content = file_get_contents(storage_path('logs/' . $channel . '.log'));
                break;
            }

            $pattern = "/^\[(?<date>.*)\]\s(?<env>\w+)\.(?<type>\w+):(?<message>.*)/m";

            preg_match_all($pattern, $content, $matches, PREG_SET_ORDER, 0);

            foreach ($matches as $match) {
                $logs[] = [
                    'timestamp' => $match['date'],
                    'env' => $match['env'],
                    'type' => $match['type'],
                    'date' => formatDate(now(), 'Y-m-d'),
                    'message' => trim($match['message'])
                ];
            }
        } catch (\Throwable $th) {
            $this->sendReportLog(ReportLogType::ERROR, $th->getMessage());
        }

        return $logs;
    }
}
