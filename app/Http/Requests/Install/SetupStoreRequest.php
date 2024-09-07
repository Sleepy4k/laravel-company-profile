<?php

namespace App\Http\Requests\Install;

use App\Http\Requests\Request;

class SetupStoreRequest extends Request
{
    /**
     * The route that users should be redirected to if validation fails.
     *
     * @var string
     */
    protected $redirectRoute  = 'install.setup';

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
            'app_url' => ['required', 'url'],
            'app_name' => ['required', 'string'],
            'database_hostname' => ['required', 'string'],
            'database_port' => ['required', 'string'],
            'database_name' => ['required', 'string'],
            'database_username' => ['required', 'string'],
            'database_password' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes(): array
    {
        return [
            'app_url' => 'App URL',
            'app_name' => 'App Name',
            'database_hostname' => 'Database Hostname',
            'database_port' => 'Database Port',
            'database_name' => 'Database Name',
            'database_username' => 'Database Username',
            'database_password' => 'Database Password',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'app_url.required' => 'The :attribute field is required.',
            'app_url.url' => 'The :attribute must be a valid URL.',
            'app_name.required' => 'The :attribute field is required.',
            'app_name.string' => 'The :attribute must be a string.',
            'database_hostname.required' => 'The :attribute field is required.',
            'database_hostname.string' => 'The :attribute must be a string.',
            'database_port.required' => 'The :attribute field is required.',
            'database_port.string' => 'The :attribute must be a string.',
            'database_name.required' => 'The :attribute field is required.',
            'database_name.string' => 'The :attribute must be a string.',
            'database_username.required' => 'The :attribute field is required.',
            'database_username.string' => 'The :attribute must be a string.',
            'database_password.string' => 'The :attribute must be a string.',
        ];
    }
}
