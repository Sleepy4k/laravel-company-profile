<?php

namespace App\Enum;

enum ReportLogType: string
{
    case DEBUG = 'debug';
    case ERROR = 'error';
    case ALERT = 'alert';
    case INFO = 'info';
    case WARNING = 'warning';
}
