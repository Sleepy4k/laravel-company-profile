<?php

namespace App\Http\Requests\Application;

use App\Http\Requests\Request;
use App\Rules\ApplicationSettingTypeCategory;

class UpdateSettingTypeRequest extends Request
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
            'name' => ['required', 'string', 'max:255', 'unique:application_setting_types,name,' . $this->type->id],
            'description' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255', new ApplicationSettingTypeCategory],
        ];
    }
}
