<?php

namespace App\Http\Requests\Translate;

use App\Rules\LanguageLangKey;
use App\Http\Requests\Request;

class StoreLanguageRequest extends Request
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
            'lang' => ['required', 'string', 'max:255', new LanguageLangKey],
        ];
    }
}
