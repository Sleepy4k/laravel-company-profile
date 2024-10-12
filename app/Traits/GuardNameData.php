<?php

namespace App\Traits;

trait GuardNameData
{
    /**
     * Get list of guard name to set permission guard name
     *
     * @return array
     */
    protected function getGuardNameList(): array
    {
        $guardList = [];
        $blaclistedGuard = ['sanctum'];

        foreach (config('auth.guards') as $value => $guard) {
            $isBlacklisted = false;

            foreach($blaclistedGuard as $blacklisted){
                if (strpos($value, $blacklisted) !== false) {
                    $isBlacklisted = true;
                    break;
                }
            }

            if ($isBlacklisted) continue;

            $guardList[] = [
                'value' => $value,
                'label' => ucfirst($value),
            ];
        }

        return $guardList;
    }

    /**
     * Get default guard name for permission guard name
     *
     * @return array
     */
    private function getDefaultGuardName(): array
    {
        $default = config('auth.defaults.guard');

        if (!$default) return [
            'value' => 'web',
            'label' => 'Web'
        ];

        return [
            'value' => $default,
            'label' => ucfirst($default)
        ];
    }
}
