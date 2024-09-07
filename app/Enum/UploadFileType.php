<?php

namespace App\Enum;

enum UploadFileType: string
{
    case IMAGE = 'images';

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
