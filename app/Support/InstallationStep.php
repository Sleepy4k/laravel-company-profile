<?php

namespace App\Support;

class InstallationStep
{
    /**
     * The current step.
     *
     * @var string
     */
    protected string $currentStep;

    /**
     * The steps array.
     *
     * @var array
     */
    protected array $steps = [
        'requirements' => false,
        'permissions' => false,
        'setup' => false,
        'user' => false,
        'finish' => false,
    ];

    /**
     * InstallationStep constructor.
     *
     * @param string $currentStep
     */
    public function __construct(string $currentStep = 'permissions')
    {
        // Check if steps not exists in the storage.
        if (!file_exists(storage_path('.steps'))) {
            $this->save();
        }

        $this->currentStep = $currentStep;
        $this->steps = $this->getStepsFromFile();
    }

    /**
     * Get the steps.
     *
     * @return array
     */
    public function getSteps(): array
    {
        return $this->steps;
    }

    /**
     * Get the current step.
     *
     * @return string
     */
    public function getCurrentStep(): string
    {
        return $this->currentStep;
    }

    /**
     * Check if the step is completed.
     *
     * @return bool
     */
    public function isPreviousStepCompleted(): bool
    {
        $steps = array_keys($this->steps);
        $currentStepIndex = array_search($this->currentStep, $steps);

        // Check if the current step is the first step.
        if ($currentStepIndex === 0) {
            return true;
        }

        return $this->steps[$steps[$currentStepIndex - 1]];
    }

    /**
     * Get the next step.
     *
     * @return string
     */
    public function getNextStep(): string
    {
        $steps = array_keys($this->steps);
        $currentStepIndex = array_search($this->currentStep, $steps);

        // Check if the current step is the last step.
        if ($currentStepIndex === count($steps) - 1) {
            return $this->currentStep;
        }

        return $steps[$currentStepIndex + 1];
    }

    /**
     * Mark the step as completed.
     *
     * @param string $step
     */
    public function markAsCompleted(): void
    {
        $this->steps[$this->currentStep] = true;
        $this->save();
    }

    /**
     * Mark the step as not completed.
     *
     * @param string $step
     */
    public function markAsNotCompleted(): void
    {
        $this->steps[$this->currentStep] = false;
        $this->save();
    }

    /**
     * Set all steps to file in the storage.
     */
    protected function save(): void
    {
        file_put_contents(storage_path('.steps'), json_encode($this->steps));
    }

    /**
     * Get the steps from the storage.
     *
     * @return array
     */
    protected function getStepsFromFile(): array
    {
        return json_decode(file_get_contents(storage_path('.steps')), true);
    }
}
