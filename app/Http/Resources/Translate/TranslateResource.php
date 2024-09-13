<?php

namespace App\Http\Resources\Translate;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TranslateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => $this->uuid,
            'group' => $this->group,
            'key' => $this->key,
            'text' => $this->text,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
