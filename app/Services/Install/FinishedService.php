<?php

namespace App\Services\Install;

use App\Services\Service;
use Illuminate\Support\Facades\URL;
use Symfony\Component\Process\PhpExecutableFinder;

class FinishedService extends Service
{
    /**
     * Handle the incoming request.
     *
     * @return array
     */
    public function invoke(): array
    {
        try {
            $base_url = url('/');
            $base_path = base_path();
            $phpFinder = new PhpExecutableFinder;
            $phpExecutable = $phpFinder->find(false);
            $minPhpVersion = config('installer.core.minPhpVersion');
            $user = $this->userInterface->get(['email', 'name'], true);
            $link_url = URL::temporarySignedRoute('install.link', now()->addMinutes(10));

            return compact('base_url', 'base_path', 'phpExecutable', 'minPhpVersion', 'user', 'link_url');
        } catch (\Exception $e) {
            throw new \Exception('Could not finished installation: '.$e->getMessage());
        }
    }
}
