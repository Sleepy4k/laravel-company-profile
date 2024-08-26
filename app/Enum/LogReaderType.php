<?php

namespace App\Enum;

enum LogReaderType: string
{
    case DAILY = 'daily';
    case SINGLE = 'single';
}
