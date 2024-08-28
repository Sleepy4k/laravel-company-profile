<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use App\Models\User;
use Inertia\Response;
use App\Trait\FinishesInstallation;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\Process\PhpExecutableFinder;
use App\Exceptions\FailedToFinalizeInstallationException;

class FinishedController extends Controller
{
    use FinishesInstallation;

    /**
     * Display the finish step or apply patches
     *
     * @return Response|RedirectResponse
     */
    public function __invoke(): Response|RedirectResponse
    {
        try {
            // Write the installed file
            $this->finishInstallation();
        } catch (FailedToFinalizeInstallationException $e) {
            //
        }

        $user = User::first();
        $phpFinder = new PhpExecutableFinder;
        $phpExecutable = $phpFinder->find(false);

        return Inertia::render('Install/Finish', [
            'user' => $user,
            'base_url' => url('/'),
            'base_path' => base_path(),
            'phpExecutable' => $phpExecutable,
            'minPhpVersion' => config('installer.core.minPhpVersion'),
        ]);
    }
}
