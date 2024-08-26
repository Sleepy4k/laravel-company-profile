<?php

use Carbon\Carbon;

if (!function_exists('formatDate')) {
    /**
     * Format current date to different format
     *
     * @param mixed $date
     * @param string $format
     *
     * @return string
     */
    function formatDate(mixed $date, string $format = 'd-m-Y'): string
    {
        return Carbon::parse($date)->format($format);
    }
}
