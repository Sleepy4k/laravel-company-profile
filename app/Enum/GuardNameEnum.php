<?php

namespace App\Enum;

enum GuardNameEnum: string
{
    case WEB = 'web';
    case API = 'api';

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
