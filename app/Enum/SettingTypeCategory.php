<?php

namespace App\Enum;

enum SettingTypeCategory: string
{
    case STRING = 'string';
    case FILE = 'file';

    /**
     * Get all the values from the enum
     *
     * @return array<string>
     */
    public static function toArray(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get the enum from the value
     *
     * @param string $value
     *
     * @return SettingTypeCategory
     */
    public static function fromValue(string $value): SettingTypeCategory
    {
        return match ($value) {
            self::STRING => self::STRING,
            self::FILE => self::FILE,
            default => self::STRING,
        };
    }
}
