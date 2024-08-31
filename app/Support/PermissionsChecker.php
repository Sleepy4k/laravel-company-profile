<?php

namespace App\Support;

class PermissionsChecker
{
    /**
     * The results array.
     *
     * @var array
     */
    protected array $results = [
        'results' => [],
    ];

    /**
     * Check for the folders permissions.
     *
     * @return array
     */
    public function check(): array
    {
        $folders = config('installer.permissions');

        foreach ($folders as $folder => $permission) {
            if (! ($this->getPermission($folder) >= $permission)) {
                $this->addFileAndSetErrors($folder, $permission, false);
            } else {
                $this->addFile($folder, $permission, true);
            }
        }

        return $this->results;
    }

    /**
     * Get a folder permission.
     *
     * @param string $folder
     *
     * @return string
     */
    private function getPermission(string $folder): string
    {
        return substr(sprintf('%o', fileperms(base_path($folder))), -4);
    }

    /**
     * Add the file to the list of results.
     *
     * @param string $folder
     * @param string $permission
     * @param bool $isSet
     *
     * @return void
     */
    private function addFile(string $folder, string $permission, bool $isSet): void
    {
        $this->results['results'][] = [
            'folder' => $folder,
            'permission' => $permission,
            'isSet' => $isSet,
        ];
    }

    /**
     * Add the file and set the errors.
     *
     * @param string $folder
     * @param string $permission
     * @param bool $isSet
     *
     * @return void
     */
    private function addFileAndSetErrors(string $folder, string $permission, bool $isSet): void
    {
        $this->addFile($folder, $permission, $isSet);

        $this->results['errors'] = true;
    }
}
