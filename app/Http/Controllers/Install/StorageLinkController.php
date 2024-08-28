<?php

namespace App\Http\Controllers\Install;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Artisan;

class StorageLinkController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): RedirectResponse
    {
        try {
            // Clear the cache
            Artisan::call('cache:clear');
            Artisan::call('config:clear');

            // Create a symbolic link from "public/storage" to "storage/app/public"
            Artisan::call('storage:link');
            
            // Redirect to the next step
            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back()
                ->withErrors([
                    'message' => 'Failed to create symbolic link.'
                ]);
        }
    }
}
