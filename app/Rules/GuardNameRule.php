<?php

namespace App\Rules;

use Closure;
use App\Enum\GuardNameEnum;
use Illuminate\Contracts\Validation\ValidationRule;

class GuardNameRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if the value is in the GuardName enum
        if (!in_array($value, GuardNameEnum::toArray(), true)) {
            $fail("The $attribute must be one of the following: " . implode(', ', GuardNameEnum::toArray()));
        }
    }
}
