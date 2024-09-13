<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeServiceCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name} {--type=resource} {--resource} {--plain} {--invokable} {--r} {--p} {--i}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * The namespace of the service.
     *
     * @var string
     */
    protected $namespace = 'App\Services';

    /**
     * Create a new file.
     *
     * @param string $namespace
     * @param string $name
     * @param string $stub
     */
    protected function createFile(string $namespace, string $name, string $stub): void
    {
        // Make path to support sub directories
        $dir = str_replace($this->namespace, '', $namespace);
        $dir = app_path('Services' . str_replace('/', '\\', $dir));

        // Create the directory if it does not exist
        if (!is_dir($dir)) mkdir($dir, 0755, true);

        $path = $dir . '\\' . $name . 'Service.php';

        if (file_exists($path)) {
            $this->error('Service already exists!');

            exit(1);
        }

        $service = str_replace(['{{ namespace }}', '{{ class }}'], [$namespace, $name.'Service'], $stub);

        file_put_contents($path, $service);

        $this->info('Service created successfully.');
    }

    /**
     * Get the stub file for the generator.
     *
     * @param string $type
     * @return string
     */
    protected function getStub(string $type): string
    {
        if (!in_array($type, ['plain', 'resource', 'invokable'])) {
            $this->error('Invalid service type. Available types are: plain, resource, invokable');

            exit(1);
        }

        // if type is resource, return the resource stub
        if ($type === 'resource') return file_get_contents(base_path() . "/stubs/service.stub");

        return file_get_contents(base_path() . "/stubs/service.{$type}.stub");
    }

    /**
     * Create a new service class.
     *
     * @param string $name
     * @param string $type
     */
    protected function createService(string $name, string $type): void
    {
        // If name already has the word service, remove it
        if (str_contains($name, 'Service')) {
            $name = str_replace('Service', '', $name);
        }

        $namespace = $this->namespace;

        // if name had sub directories, remove them and add them to the namespace
        if (str_contains($name, '/')) {
            $name = str_replace('/', '\\', $name);
            $namespace .= '\\' . str_replace('/', '\\', dirname($name));
            $name = basename($name);
        }

        $stub = $this->getStub($type);

        $this->createFile($namespace, $name, $stub);
    }

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $name = $this->argument('name');
        $type = $this->option('type');

        // Check option for resource
        if ($this->option('resource') || $this->option('r')) {
            $type = 'resource';
        }

        // Check option for plain
        if ($this->option('plain') || $this->option('p')) {
            $type = 'plain';
        }

        // Check option for invokable
        if ($this->option('invokable') || $this->option('i')) {
            $type = 'invokable';
        }

        $this->createService($name, $type);
    }
}
