<?php

namespace App\Http\Resources\Application;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingBoxResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'key' => $this->key,
            'name' => $this->display,
            'value' => $this->value,
            'description' => $this->description,
            'updated_at' => $this->updated_at ? $this->updated_at->diffForHumans() : now()->diffForHumans(),
        ];
    }
}
