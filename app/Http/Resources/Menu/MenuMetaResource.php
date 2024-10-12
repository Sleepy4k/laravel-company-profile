<?php

namespace App\Http\Resources\Menu;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuMetaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'translation_key' => $this->translation_key,
            'route' => $this->route,
            'permission' => $this->handlePermissions(),
            'parameters' => $this->parameters,
            'active_routes' => $this->handleActiveRoutes(),
        ];
    }

    /**
     * Handle permissions.
     *
     * @return array
     */
    private function handlePermissions(): array
    {
        $splitted = explode(',', $this->permission);
        $trimmed = array_map('trim', $splitted);
        $filtered = array_filter($trimmed);

        return $filtered;
    }

    /**
     * Handle active routes.
     *
     * @return array
     */
    private function handleActiveRoutes(): array
    {
        $splitted = explode(',', $this->active_routes);
        $trimmed = array_map('trim', $splitted);
        $filtered = array_filter($trimmed);

        return $filtered;
    }
}
