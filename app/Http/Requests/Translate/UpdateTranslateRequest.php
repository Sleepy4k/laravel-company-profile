<?php

namespace App\Http\Requests\Translate;

use App\Http\Requests\Request;

class UpdateTranslateRequest extends Request
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
            'group' => ['required', 'max:255', 'string'],
            'key' => ['required', 'max:255', 'string', 'unique:language_lines,id,' . $this->list->id],
            'lang_id' => ['required', 'max:255', 'string'],
            'lang_en' => ['required', 'max:255', 'string']
        ];
    }
}
