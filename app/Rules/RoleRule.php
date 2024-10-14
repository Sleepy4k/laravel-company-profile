<?php

namespace App\Rules;

use Closure;
use App\Models\Role;
use App\Enum\RoleEnum;
use Illuminate\Contracts\Validation\ValidationRule;

class RoleRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (in_array($value, RoleEnum::toArray(), true)) return;

        try {
            Role::findByName($value);

            return;
        } catch (\Throwable $th) {
            $fail(trans('rule.role.message'));
        }
    }
}
