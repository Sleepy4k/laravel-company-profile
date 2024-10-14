<?php

namespace App\Enum;

enum RoleEnum: string
{
    /**
     * Get all the values from the enum
     *
     * @return array<string>
     */
    public static function toArray(): array
    {
        return config('permission.seeder.role');
    }
}
