<?php

namespace App\Services\Install;

use App\Services\Service;
use App\Traits\DatabaseTest;
use App\Support\Environment;
use App\Support\PrivilegesChecker;
use App\Support\EnvironmentManager;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;

class SetupService extends Service
{
    use DatabaseTest;

    /**
     * The environment manager instance.
     *
     * @var EnvironmentManager
     */
    protected $environmentManager;

    /**
     * Create a new service instance.
     *
     * @param EnvironmentManager $environmentManager
     *
     * @return void
     */
    public function __construct(EnvironmentManager $environmentManager)
    {
        $this->environmentManager = $environmentManager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function index(): array
    {
        try {
            $guessedUrl = EnvironmentManager::guestUrl();
            $defaultConfig = [
                'app_name' => config('app.name'),
                'database_hostname' => config('database.connections.mysql.host'),
                'database_port' => config('database.connections.mysql.port'),
                'database_name' => config('database.connections.mysql.database'),
                'database_username' => config('database.connections.mysql.username'),
            ];

            return compact('guessedUrl', 'defaultConfig');
        } catch (\Exception $e) {
            throw new \Exception('Could not get the default configuration: '.$e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param array $request
     *
     * @return void
     */
    public function store(array $request): void
    {
        try {
            Artisan::call('config:clear');
            $connection = $this->testDatabaseConnection($request);
            (new PrivilegesChecker($connection))->check();
        } catch (\Exception $e) {
            $validator = Validator::make([], []);
            $this->setDatabaseTestsErrors($validator, $e);

            // Throw an exception with the validation errors
            throw new \Exception('Could not connect to the database: '.$e->getMessage());
        }

        if (!$this->environmentManager->saveEnvFile(
            new Environment(
                name: $request['app_name'],
                key: config('app.key'),
                url: $request['app_url'],
                dbHost: $request['database_hostname'],
                dbPort: $request['database_port'],
                dbName: $request['database_name'],
                dbUser: $request['database_username'],
                dbPassword: $request['database_password'] ?: '',
            )
        )) throw new \Exception('Failed to write .env file, make sure that the files permissions and ownership are correct. Check documentation on how to setup the permissions and ownership.');
    }
}
