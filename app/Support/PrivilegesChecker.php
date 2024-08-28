<?php

namespace App\Support;

use Illuminate\Database\Connection;
use App\Exceptions\PrivilegeNotGrantedException;

class PrivilegesChecker
{
    /**
     * Initialize PrivilegesChecker instance
     *
     * @param \Illuminate\Database\Connection $connection
     *
     * @return void
     */
    public function __construct(protected Connection $connection)
    {
    }

    /**
     * Check the privileges
     *
     * @throws \App\Installer\PrivilegeNotGrantedException
     *
     * @return void
     */
    public function check(): void
    {
        $testMethods = $this->getTesterMethods();
        $tester = new DatabaseTest($this->connection);

        foreach ($testMethods as $test) {
            $tester->{$test}();

            throw_if($tester->getLastError(), new PrivilegeNotGrantedException($tester->getLastError()));
        }
    }

    /**
     * Get the tester methods
     *
     * @return array
     */
    protected function getTesterMethods(): array
    {
        return [
            // should be first as it's the most important for this test as all other tests are dropping the table
            'testDropTable',
            'testCreateTable',
            'testSelect',
            'testInsert',
            'testUpdate',
            'testDelete',
            'testAlter',
            'testIndex',
            'testReferences',
        ];
    }
}
