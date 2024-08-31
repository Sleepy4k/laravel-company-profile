<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ApplicationSettingKey implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Make sure the key does not contain any spaces or special characters
        if (preg_match('/[^A-Za-z_]/', $value)) {
            $fail(__('The :attribute may only contain letters, and underscores.', ['attribute' => $attribute]));
        }
    }
}
