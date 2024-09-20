<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use App\Models\Translate;
use App\Traits\AppSetting;
use Illuminate\Http\Request;
use App\Http\Resources\User\AuthInertiaResource;

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
            'translations' => Translate::get(['group', 'key', 'text'])->mapWithKeys(function ($item) {
                return [$item->group.'.'.$item->key => $item->text[app()->getLocale()] ?? $item->text['en']];
            }),
        ];
    }
}
