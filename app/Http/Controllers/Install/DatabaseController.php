<?php

namespace App\Http\Controllers\Install;

use App\Trait\FinishesInstallation;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class DatabaseController extends Controller
{
    use FinishesInstallation;

    /**
     * Migrate the database
     *
     * @return RedirectResponse
     */
    public function __invoke(): RedirectResponse
    {
        try {
            // if not already migrated then migrate
            if (!$this->isAlreadyMigrated()) $this->migrate();

            return to_route('install.user');
        } catch (\Exception $e) {
            return to_route('install.setup')
                ->withErrors([
                    'general' => 'Could not migrate database: '.$e->getMessage(),
                ]);
        }
    }
}
