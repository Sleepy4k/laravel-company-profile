<?php

namespace App\Http\Requests\Install;

use App\Http\Requests\Request;

class UserStoreRequest extends Request
{
    /**
     * The route that users should be redirected to if validation fails.
     *
     * @var string
     */
    protected $redirectRoute  = 'install.user';

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:195'],
            'email' => ['required', 'string', 'email', 'max:195', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed'],
        ];
    }
}
