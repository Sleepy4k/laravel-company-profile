<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class OptimizeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'naka:optimize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize the application by applying cache.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('optimize');
    }
}
