<?php

namespace App\Enum;

enum LanguageEnum: string
{
    case ENGLISH = 'en';
    case INDONESIAN = 'id';

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
