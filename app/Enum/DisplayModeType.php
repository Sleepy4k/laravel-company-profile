<?php

namespace App\Enum;

enum DisplayModeType: string
{
    case TABLE = 'table';
    case BOX = 'box';

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
     * @return self
     */
    public static function fromValue(string $value): self
    {
        return match ($value) {
            'table' => self::TABLE,
            'box' => self::BOX,
            default => throw new \InvalidArgumentException("Invalid value: $value"),
        };
    }

    /**
     * Convert the enum to a where case
     *
     * @return string
     */
    public static function toWhereCase(): string
    {
        return implode('|', self::toArray());
    }
}
