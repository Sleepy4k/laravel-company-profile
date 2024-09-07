<?php

namespace App\Enum;

enum LogReaderType: string
{
    case DAILY = 'daily';
    case SINGLE = 'single';

    /**
     * Get all the values from the enum
     *
     * @return array<string>
     */
    public static function toArray(): array
    {
        return array_column(self::cases(), 'value');
    }
}
