<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use App\Models\User;
use Inertia\Response;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Artisan;
use App\Http\Requests\Install\UserStoreRequest;

class UserController extends Controller
{
    /**
     * Display the user step
     *
     * @return Response
     */
    public function index(): Response|RedirectResponse
    {
        return Inertia::render('Install/User');
    }

    /**
     * Store the user
     *
     * @param UserStoreRequest $request
     *
     * @return RedirectResponse
     */
    public function store(UserStoreRequest $request): RedirectResponse
    {
        try {
            User::unguarded(function () use ($request) {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make($request->password)
                ]);

                $roleCount = Role::count();

                if ($roleCount === 0) {
                    Artisan::call('db:seed', [
                        '--class' => 'PermissionSeeder'
                    ]);
                    Artisan::call('db:seed', [
                        '--class' => 'RoleSeeder'
                    ]);
                }

                // Check if role superadmin exists
                $role = Role::where('name', 'superadmin')->first();

                // If role superadmin does not exist, create it
                if (!$role) $role = Role::create(['name' => 'superadmin']);

                $user->assignRole($role->name);
            });

            // Clear the cache
            Artisan::call('cache:clear');

            return redirect()->back();
        } catch (\Throwable $th) {
            return to_route('install.user')
                ->withErrors([
                    'general' => 'Could not create the user: '.$th->getMessage(),
                ]);
        }
    }
}
