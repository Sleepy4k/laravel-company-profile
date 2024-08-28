<?php

namespace App\Support;

use PDOException;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Connection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\QueryException;

class DatabaseTest
{
    /**
     * Last error message
     *
     * @var string|null
     */
    protected $lastError;

    /**
     * Schema builder instance
     *
     * @var \Illuminate\Database\Schema\Builder
     */
    protected $schema;

    /**
     * Test table name
     *
     * @var string
     */
    protected string $testTable = 'test_table';

    /**
     * Initialize new DatabaseTest instance
     *
     * @param  \Illuminate\Database\Connection  $connection
     *
     * @return void
     */
    public function __construct(protected Connection $connection)
    {
        $this->schema = Schema::connection($this->connection->getName());
    }

    /**
     * Test DROP privilege
     *
     * @return void
     */
    public function testDropTable(): void
    {
        try {
            // Even if there is no table, will fail if the DROP privilege is not granted
            $this->dropTable();
        } catch (QueryException $e) {
            $this->lastError = $e->getMessage();
        }
    }

    /**
     * Test CREATE privilege
     *
     * @return void
     */
    public function testCreateTable(): void
    {
        $this->performTest(function () {
            $this->createTable();
        });
    }

    /**
     * Test INSERT privilege
     *
     * @return void
     */
    public function testInsert(): void
    {
        $this->performTest(function () {
            $this->createTable();
            $this->insertRow();
        });
    }

    /**
     * Test SELECT privilege
     *
     * @return void
     */
    public function testSelect(): void
    {
        $this->performTest(function () {
            $this->createTable();
            DB::usingConnection($this->connection->getName(), function () {
                DB::select("SELECT * FROM {$this->testTable}");
            });
        });
    }

    /**
     * Test UPDATE privilege
     *
     * @return void
     */
    public function testUpdate(): void
    {
        $this->performTest(function () {
            $this->createTable();
            $this->insertRow();
            DB::usingConnection($this->connection->getName(), function () {
                DB::table($this->testTable)->update(['test_column' => 'Benjamin4k']);
            });
        });
    }

    /**
     * Test DELETE privilege
     *
     * @return void
     */
    public function testDelete(): void
    {
        $this->performTest(function () {
            $this->createTable();
            $this->insertRow();
            DB::usingConnection($this->connection->getName(), function () {
                DB::table($this->testTable)->delete();
            });
        });
    }

    /**
     * Test ALTER privilege
     *
     * @return void
     */
    public function testAlter(): void
    {
        $this->performTest(function () {
            $this->createTable(function ($table) {
                $table->primary('id');
            });
        });
    }

    /**
     * Test INDEX privilege
     *
     * @return void
     */
    public function testIndex(): void
    {
        $this->performTest(function () {
            $this->createTable();
            $this->insertRow();
            $this->connection->getPdo()->exec(
                "CREATE INDEX test_column_index ON {$this->testTable} (test_column(10))"
            );
        });
    }

    /**
     * Test REFERENCES privilege
     *
     * @return void
     */
    public function testReferences(): void
    {
        try {
            $this->createTable(function ($table) {
                $table->primary('id');
            }, 'test_users');

            $this->createTable(function ($table) {
                $table->primary('id');
                $table->unsignedBigInteger('test_user_id');
                $table->foreign('test_user_id')
                    ->references('id')
                    ->on('test_users');
            });
        } catch (QueryException $e) {
            $this->lastError = $e->getMessage();
        } finally {
            $this->dropTable($this->testTable);
            $this->dropTable('test_users');
        }
    }

    /**
     * Get the last test error
     *
     * @return string|null
     */
    public function getLastError(): ?string
    {
        return $this->lastError;
    }

    /**
     * Drop table
     *
     * @param  string|null  $tableName
     *
     * @return void
     */
    protected function dropTable(?string $tableName = null): void
    {
        $this->schema->dropIfExists($tableName ?: $this->testTable);
    }

    /**
     * Perform test
     *
     * @param  \Closure  $callback
     *
     * @return void
     */
    protected function performTest($callback): void
    {
        try {
            $callback();
        } catch (QueryException|PDOException $e) {
            $this->lastError = $e->getMessage();
        } finally {
            $this->dropTable();
        }
    }

    /**
     * Create test table
     *
     * @param  \Closure|null  $callback
     * @param  string|null  $tableName
     *
     * @return void
     */
    protected function createTable($callback = null, $tableName = null): void
    {
        $this->schema->create($tableName ?: $this->testTable, function ($table) use ($callback) {
            $table->unsignedBigInteger('id');
            $table->string('test_column');

            if ($callback) $callback($table);
        });
    }

    /**
     * Insert test row in the test table
     *
     * @return void
     */
    protected function insertRow(): void
    {
        DB::usingConnection($this->connection->getName(), function () {
            DB::insert(
                'insert into '.$this->testTable.' (id, test_column) values (?, ?)',
                [1, 'sleepy4k']
            );
        });
    }
}
