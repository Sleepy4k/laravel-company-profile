<?php

namespace App\Services\Log;

use App\Services\Service;

class HomeService extends Service
{
    /**
     * Handle the incoming request.
     *
     * @return array
     */
    public function invoke(): array
    {
        try {
            return [];
        } catch (\Exception $e) {
            throw new \Exception('Something went wrong');
        }
    }
}
