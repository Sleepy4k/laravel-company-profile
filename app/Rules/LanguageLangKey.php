<?php

namespace App\Rules;

use Closure;
use App\Enum\LanguageEnum;
use Illuminate\Contracts\Validation\ValidationRule;

class LanguageLangKey implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!in_array($value, LanguageEnum::toArray(), true)) {
            $fail("The $attribute must be one of the following: " . implode(', ', LanguageEnum::toArray()));
        }
    }
}
