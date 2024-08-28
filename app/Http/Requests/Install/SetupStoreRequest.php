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
            'app_url' => __('App URL'),
            'app_name' => __('App Name'),
            'database_hostname' => __('Database Hostname'),
            'database_port' => __('Database Port'),
            'database_name' => __('Database Name'),
            'database_username' => __('Database Username'),
            'database_password' => __('Database Password'),
        ];
    }
}
