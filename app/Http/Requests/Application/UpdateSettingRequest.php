<?php

namespace App\Http\Requests\Application;

use App\Http\Requests\Request;
use App\Rules\ApplicationSettingKey;

class UpdateSettingRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth('web')->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'key' => ['required', 'string', 'max:255', new ApplicationSettingKey, 'unique:application_settings,key,' . $this->applicationSetting->id],
            'display' => ['required', 'string', 'max:255'],
            'value' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'type_id' => ['required', 'integer', 'min:0', 'exists:application_setting_types,id'],
        ];
    }
}
