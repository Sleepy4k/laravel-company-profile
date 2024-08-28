<?php

namespace App\Http\Controllers\Install;

use Inertia\Inertia;
use Inertia\Response;
use App\Trait\DatabaseTest;
use App\Support\Environment;
use App\Support\PrivilegesChecker;
use App\Support\EnvironmentManager;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Install\SetupStoreRequest;

class SetupController extends Controller
{
    use DatabaseTest;

    /**
     * Application setup
     *
     * @return Response
     */
    public function index(): Response
    {
        $guessedUrl = EnvironmentManager::guestUrl();
        $defaultConfig = [
            'app_name' => config('app.name'),
            'database_hostname' => config('database.connections.mysql.host'),
            'database_port' => config('database.connections.mysql.port'),
            'database_name' => config('database.connections.mysql.database'),
            'database_username' => config('database.connections.mysql.username'),
        ];

        return Inertia::render('Install/Setup', [
            'guessedUrl' => $guessedUrl,
            'defaultConfig' => $defaultConfig
        ]);
    }

    /**
     * Store the environmental variables
     *
     * @param SetupStoreRequest $request
     * @param EnvironmentManager $environmentManager
     *
     * @return RedirectResponse
     */
    public function store(SetupStoreRequest $request, EnvironmentManager $environmentManager): RedirectResponse
    {
        try {
            $connection = $this->testDatabaseConnection($request->validated());
            (new PrivilegesChecker($connection))->check();
        } catch (\Exception $e) {
            $validator = Validator::make([], []);
            $this->setDatabaseTestsErrors($validator, $e);

            return to_route('install.setup')
                ->withErrors($validator->errors())
                ->withInput();
        }

        // Check if request data differs from the default values
        if ($request->app_name === config('app.name') &&
            $request->database_hostname === config('database.connections.mysql.host') &&
            $request->database_port === config('database.connections.mysql.port') &&
            $request->database_name === config('database.connections.mysql.database') &&
            $request->database_username === config('database.connections.mysql.username')) {

            return to_route('install.database');
        }

        if (! $environmentManager->saveEnvFile(new Environment(
            name: $request->app_name,
            key: config('app.key'),
            url: $request->app_url,
            dbHost: $request->database_hostname,
            dbPort: $request->database_port,
            dbName: $request->database_name,
            dbUser: $request->database_username,
            dbPassword: $request->database_password ?: '',
        ))) {
            return to_route('install.setup')
                ->withErrors([
                    'general' => 'Failed to write .env file, make sure that the files permissions and ownership are correct. Check documentation on how to setup the permissions and ownership.',
                ]);
        }

        // Return back to the setup page
        return redirect()->back();
    }
}
