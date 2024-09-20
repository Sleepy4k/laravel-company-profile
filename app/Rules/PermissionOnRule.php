<?php

namespace App\Rules;

use App\Models\Permission;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PermissionOnRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Make sure when permissions is not null, it is an array and all values are strings
        // And make sure all permissions exist in the database
        if ($value === null) return;

        if (!is_array($value)) {
            $fail("The $attribute must be an array.");
            return;
        }

        $permissions = Permission::select('name')->get()->pluck('name')->toArray();

        foreach ($value as $permission) {
            if (!is_string($permission)) {
                $fail("The $attribute must be an array of strings.");
                return;
            }

            if (!in_array($permission, $permissions, true)) {
                $fail("The $attribute must be an array of existing permissions.");
                return;
            }
        }
    }
}
