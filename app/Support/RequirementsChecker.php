<?php

namespace App\Support;

class RequirementsChecker
{
    /**
     * Create empty result set
     *
     * @return array
     */
    protected function createEmptyResultSet(): array
    {
        return [
            'results' => [
                'php' => [],
                'functions' => [],
                'apache' => [],
            ],
            'recommended' => [
                'php' => [],
            ],
            'errors' => false,
        ];
    }

    /**
     * Check the php requirements
     *
     * @param array $requirements
     *
     * @return array
     */
    protected function checkPHPRequirements(array $requirements): array
    {
        $results = [];

        foreach ($requirements as $requirement) {
            $results[$requirement] = extension_loaded($requirement);
        }

        return $results;
    }

    /**
     * Determine if all checks fails
     *
     * @param array $checks
     *
     * @return bool
     */
    protected function determineIfFails(array $checks): bool
    {
        return count(array_filter($checks)) !== count($checks);
    }

    /**
     * Check the PHP functions requirements
     *
     * @param array $functions
     *
     * @return array
     */
    protected function checkPHPFunctions(array $functions): array
    {
        $results = [];

        foreach ($functions as $function) {
            $results[$function] = in_array($function, get_defined_functions()['internal']);
        }

        return $results;
    }

    /**
     * Check if the installation requirements are met.
     *
     * @return array
     */
    public function check(): array
    {
        $results = $this->createEmptyResultSet();
        $requirements = config('installer.requirements');

        foreach ($requirements as $type => $requirement) {
            switch ($type) {
            case 'php':
                $checks = $this->checkPHPRequirements($requirements[$type]);
                $results['results'][$type] = array_merge($results['results'][$type], $checks);

                if ($this->determineIfFails($checks)) $results['errors'] = true;
                break;
            case 'functions':
                $checks = $this->checkPHPFunctions($requirements[$type]);

                $results['results'][$type] = array_merge($results['results'][$type], $checks);

                if ($this->determineIfFails($checks)) $results['errors'] = true;
                break;
            case 'apache':
                foreach ($requirements[$type] as $requirement) {
                    // if function doesn't exist we can't check apache modules
                    if (function_exists('apache_get_modules')) {
                        $results['results'][$type][$requirement] = true;

                        if (! in_array($requirement, apache_get_modules())) {
                            $results['results'][$type][$requirement] = false;
                            $results['errors'] = true;
                        }
                    }
                }
                break;
            case 'recommended':
                $results['recommended']['php'] = $this->checkPHPRequirements($requirements[$type]['php']);
                $results['recommended']['functions'] = $this->checkPHPFunctions($requirements[$type]['functions']);
                break;
            }
        }

        return $results;
    }

    /**
     * Check whether the given PHP requirement passes
     */
    public function passes(string $requirement): bool
    {
        $requirements = $this->check();

        if (!array_key_exists($requirement, $requirements['recommended']['php'])) {
            return $requirements['results']['php'][$requirement] ?? true;
        }

        return $requirements['recommended']['php'][$requirement];
    }

    /**
     * Check whether the given PHP requirement fails
     */
    public function fails(string $requirement): bool
    {
        return !$this->passes($requirement);
    }

    /**
     * Check PHP version requirement.
     */
    public function checkPHPversion(): array
    {
        $minVersionPhp = config('installer.core.minPhpVersion');
        $currentPhpVersion = static::getPhpVersionInfo();
        $supported = version_compare($currentPhpVersion['version'], $minVersionPhp) >= 0;

        return [
            'full' => $currentPhpVersion['full'],
            'current' => $currentPhpVersion['version'],
            'minimum' => $minVersionPhp,
            'supported' => $supported,
        ];
    }

    /**
     * Get current Php version information.
     */
    protected static function getPhpVersionInfo(): array
    {
        $currentVersionFull = PHP_VERSION;
        preg_match("#^\d+(\.\d+)*#", $currentVersionFull, $filtered);
        $currentVersion = $filtered[0];

        return [
            'full' => $currentVersionFull,
            'version' => $currentVersion,
        ];
    }
}
