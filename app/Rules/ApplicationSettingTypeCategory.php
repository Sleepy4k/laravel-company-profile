<?php

namespace App\Rules;

use Closure;
use App\Enum\SettingTypeCategory;
use Illuminate\Contracts\Validation\ValidationRule;

class ApplicationSettingTypeCategory implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the value is in the SettingTypeCategory enum
        if (!in_array($value, SettingTypeCategory::toArray(), true)) {
            $fail("The $attribute must be one of the following: " . implode(', ', SettingTypeCategory::toArray()));
        }
    }
}
