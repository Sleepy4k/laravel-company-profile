<?php

namespace App\Listeners;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Events\QueryExecuted;

class QueryExecutedListener
{
    /**
     * Handle the event.
     */
    public function handle(QueryExecuted $event): void
    {
        Log::channel('query')->info('query executed: ' . $event->sql, ['bindings' => $event->bindings, 'time' => $event->time]);
    }
}
