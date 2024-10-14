<?php

namespace App\Http\Requests\Account;

use App\Rules\RoleRule;
use App\Http\Requests\Request;

class StoreUserRequest extends Request
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
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email:dns', 'max:255', 'unique:users,email'],
            'role' => ['required', 'string', 'max:255', new RoleRule],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['nullable', 'string', 'distinct'],
            'password' => ['required', 'string', 'min:8', 'max:255', 'confirmed']
        ];
    }
}
