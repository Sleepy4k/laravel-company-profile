<?php

namespace App\Console\Commands;

use Spatie\Crawler\Crawler;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Spatie\Sitemap\SitemapGenerator;
use Spatie\Sitemap\Tags\Url;

class MakeSitemapCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a sitemap for the application.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating sitemap...');

        try {
            // modify this to your own needs
            SitemapGenerator::create(config('app.url'))
                ->setMaximumCrawlCount(250)
                ->configureCrawler(function (Crawler $crawler) {
                    $crawler->setMaximumDepth(3);
                })
                ->getSitemap()
                ->add(Url::create('/robots.txt')
                    ->setLastModificationDate(Carbon::yesterday())
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
                    ->setPriority(0.1))
                ->writeToFile(public_path('sitemap.xml'));
        } catch (\Throwable $th) {
            $this->error('Failed to generate sitemap.');
            $this->error($th->getMessage());
            return 1;
        }

        $this->info('Sitemap generated successfully.');
    }
}
