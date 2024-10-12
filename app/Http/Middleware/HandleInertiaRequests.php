<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use App\Traits\AppSetting;
use Illuminate\Http\Request;
use App\Traits\DashboardMenu;
use App\Traits\PageTranslate;
use App\Http\Resources\User\AuthInertiaResource;

class HandleInertiaRequests extends Middleware
{
    use AppSetting, PageTranslate, DashboardMenu;

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
            'app' => [
                'debug' => config('app.debug'),
                'name' => $this->getAppSetting('app_name'),
                'logo' => $this->getAppSetting('app_logo'),
                'favicon' => $this->getAppSetting('app_favicon'),
                'description' => $this->getAppSetting('app_meta_description'),
            ],
            'auth' => [
                'user' => $request->user() ? new AuthInertiaResource($request->user()?->loadMissing('roles.permissions')) : null,
            ],
            'translations' => $this->getTranslations(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'menus' => $this->getMenus($request),
        ];
    }
}
