<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeDataTableCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:datatable {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new DataTable class';

    /**
     * The namespace of the service.
     *
     * @var string
     */
    protected $namespace = 'App\DataTables';

    /**
     * Create a new file.
     *
     * @param string $service
     * @param string $stub
     */
    protected function createFile(string $namespace, string $name, string $stub): void
    {
        // Make path to support sub directories
        $dir = str_replace('App\DataTables', '', $namespace);
        $dir = app_path('DataTables' . str_replace('/', '\\', $dir));

        // Create the directory if it does not exist
        if (!is_dir($dir)) mkdir($dir, 0755, true);

        $path = $dir . '\\' . $name . 'DataTable.php';

        if (file_exists($path)) {
            $this->error('Service already exists!');

            exit(1);
        }

        $service = str_replace(['{{ namespace }}', '{{ class }}'], [$namespace, $name.'DataTable'], $stub);

        file_put_contents($path, $service);

        $this->info('Service created successfully.');
    }

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub(): string
    {
        return file_get_contents(base_path() . "/stubs/datatable.stub");
    }

    /**
     * Create a new service class.
     *
     * @param string $name
     */
    protected function createService(string $name): void
    {
        // If name already has the word service, remove it
        if (str_contains($name, 'DataTable')) {
            $name = str_replace('DataTable', '', $name);
        }

        $namespace = $this->namespace;

        // if name had sub directories, remove them and add them to the namespace
        if (str_contains($name, '/')) {
            $name = str_replace('/', '\\', $name);
            $namespace .= '\\' . str_replace('/', '\\', dirname($name));
            $name = basename($name);
        }

        $stub = $this->getStub();

        $this->createFile($namespace, $name, $stub);
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $name = $this->argument('name');

        $this->createService($name);
    }
}
