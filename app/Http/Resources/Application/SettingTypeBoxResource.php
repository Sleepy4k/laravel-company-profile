<?php

namespace App\Http\Resources\Application;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingTypeBoxResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'settings' => SettingBoxResource::collection($this->settings),
        ];
    }
}
