<?php

namespace App\Http\Controllers\Install;

use App\Trait\FinishesInstallation;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class FinalizeController extends Controller
{
    use FinishesInstallation;

    /**
     * Finalize the installation with redirect
     *
     * @return RedirectResponse
     */
    public function __invoke(): RedirectResponse
    {
        $route = URL::temporarySignedRoute('install.finished', now()->addMinutes(60));

        // Redirect to url with signed route
        return redirect($route);
    }
}
