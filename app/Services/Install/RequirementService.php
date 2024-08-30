<?php

namespace App\Services\Install;

use App\Services\Service;
use App\Support\InstallationRequirementsChecker;

class RequirementService extends Service
{
    /**
     * The installation requirements checker.
     *
     * @var InstallationRequirementsChecker
     */
    protected $checker;

    /**
     * Create a new service instance.
     *
     * @param InstallationRequirementsChecker $checker
     *
     * @return void
     */
    public function __construct(InstallationRequirementsChecker $checker)
    {
        $this->checker = $checker;
    }

    /**
     * Handle the incoming request.
     *
     * @return array
     */
    public function invoke(): array
    {
        try {
            $requirements = $this->checker->check();
            $php = $this->checker->checkPHPversion();

            return compact('php', 'requirements');
        } catch (\Exception $e) {
            throw new \Exception('Could not check requirements: '.$e->getMessage());
        }
    }
}
