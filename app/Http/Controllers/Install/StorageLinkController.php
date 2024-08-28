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
            // Create a symbolic link from "public/storage" to "storage/app/public"
            Artisan::call('storage:link');

            // Clear the cache
            Artisan::call('optimize:clear');

            // Redirect to the next step
            return redirect()->route('');
        } catch (\Throwable $th) {
            return redirect()->back()
                ->withErrors([
                    'message' => 'Failed to create symbolic link.'
                ]);
        }
    }
}
