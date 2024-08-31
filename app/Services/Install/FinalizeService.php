<?php

namespace App\Services\Install;

use App\Services\Service;
use App\Traits\FinishesInstallation;
use Illuminate\Support\Facades\URL;

class FinalizeService extends Service
{
    use FinishesInstallation;

    /**
     * Handle the incoming request.
     *
     * @return string
     */
    public function invoke(): string
    {
        try {
            // Write the installed file
            $this->finishInstallation();

            return URL::temporarySignedRoute('install.finished', now()->addMinutes(60));
        } catch (\Exception $e) {
            throw new \Exception('Could not finalize installation: '.$e->getMessage());
        }
    }
}
