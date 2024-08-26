<?php

if (!function_exists('formatFileSize')) {
    /**
     * Format the given bytes in a proper human readable format
     *
     * @param int|float $bytes
     * @param int $precision
     *
     * @return string
     */
    function formatFileSize(int|float $bytes, int $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= pow(1024, $pow);

        return round($bytes, $precision).' '.$units[$pow];
    }
}
