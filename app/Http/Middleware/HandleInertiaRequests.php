<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use App\Traits\AppSetting;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    use AppSetting;

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            // Share translationa
            'app' => [
                'name' => $this->getAppSetting('app_name'),
                'description' => $this->getAppSetting('app_description'),
                'logo' => $this->getAppSetting('app_logo'),
                'favicon' => $this->getAppSetting('app_favicon'),
            ],
            'auth' => [
                'user' => $request->user(),
            ],
        ];
    }
}
