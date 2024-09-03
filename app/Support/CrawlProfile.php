<?php

namespace App\Support;

use Psr\Http\Message\UriInterface;
use Spatie\Crawler\CrawlProfiles\CrawlProfile as BaseCrawlProfile;

class CrawlProfile extends BaseCrawlProfile
{
    /**
     * Determine if the given URL should be crawled.
     *
     * @param UriInterface $url
     *
     * @return bool
     */
    public function shouldCrawl(UriInterface $url): bool
    {
        // Don't crawl admin or dashboard pages
        $blacklisted = ['admin', 'dashboard'];

        foreach ($blacklisted as $path) {
            if (str_contains($url->getPath(), $path)) {
                return false;
            }
        }

        return true;
    }
}
