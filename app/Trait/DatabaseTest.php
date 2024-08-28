<?php

namespace App\Trait;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;
use App\Exceptions\PrivilegeNotGrantedException;

trait DatabaseTest
{
    /**
     * Set the database tests errors
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @param  \Exception  $e
     * @return void
     */
    protected function setDatabaseTestsErrors($validator, $e)
    {
        // https://stackoverflow.com/questions/41835923/syntax-error-or-access-violation-1115-unknown-character-set-utf8mb4
        if (strstr($e->getMessage(), 'Unknown character set')) {
            $validator->getMessageBag()->add('general', 'At least MySQL 5.6 version is required.');
        } elseif ($e instanceof PrivilegeNotGrantedException) {
            $validator->getMessageBag()->add('privilege', 'The '.$e->getPriviligeName().' privilige is not granted to the database user, the following error occured during tests: '.$e->getMessage());
        } else {
            $validator->getMessageBag()->add('general', 'Could not establish database connection: '.$e->getMessage());
            $validator->getMessageBag()->add('database_hostname', 'Please check entered value.');
            $validator->getMessageBag()->add('database_port', 'Please check entered value.');
            $validator->getMessageBag()->add('database_name', 'Please check entered value.');
            $validator->getMessageBag()->add('database_username', 'Please check entered value.');
            $validator->getMessageBag()->add('database_password', 'Please check entered value.');
        }
    }

    /**
     * Test the database connection
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Database\Connection
     */
    protected function testDatabaseConnection($request)
    {
        $params = [
            'driver' => 'mysql',
            'host' => $request->database_hostname,
            'database' => $request->database_name,
            'username' => $request->database_username,
            'password' => $request->database_password,
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
        ];

        $hash = md5(json_encode($params));

        Config::set('database.connections.install'.$hash, $params);

        /**
         * @var \Illuminate\Database\Connection
         */
        $connection = DB::connection('install'.$hash);

        // Triggers PDO init, in case of errors, will fail and throw exception
        $connection->getPdo();

        return $connection;
    }
}
