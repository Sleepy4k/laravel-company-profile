<?php

namespace App\Services\Error;

use App\Services\Service;
use Illuminate\Support\Facades\Storage;

class FallbackService extends Service
{
    /**
     * Handle the incoming request.
     *
     * @return array
     */
    public function invoke(): array
    {
        try {
            // Check if this application is being accessed for the first time
            // which means the database is not yet migrated
            $isFirstTime = Storage::fileMissing('.installed');

            $status = 404;
            $home_url = url('/');
            $title = $isFirstTime ? 'Page not found' : trans('error.404.title');
            $description = $isFirstTime ? 'The page you are looking for does not exist.' : trans('error.404.description');
            $home = $isFirstTime ? 'Back to home' : trans('error.back_home');

            return compact('status', 'home_url', 'title', 'description', 'home');
        } catch (\Exception $e) {
            throw new \Exception('Something went wrong. ' . $e->getMessage());
        }
    }
}
