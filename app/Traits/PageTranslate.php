<?php

namespace App\Traits;

use App\Models\Translate;

trait PageTranslate
{
    /**
     * Manipulate the translations.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<Translate>  $translations
     *
     * @return array<string, string>
     */
    private function manipulateTranslations($translations)
    {
        $currentLocale = app()->getLocale();
        $defaultLocale = config('app.fallback_locale');

        // Map with group and key
        return $translations->mapWithKeys(function ($item) use ($currentLocale, $defaultLocale) {
            $localizedText = $item->text[$currentLocale] ?? $item->text[$defaultLocale];

            return [
                $item->group . '.' . $item->key => $localizedText,
            ];
        })->toArray();
    }

    /**
     * Get the translations.
     *
     * @return array<string, string>
     */
    public function getTranslations()
    {
        $translations = Translate::select('group', 'key', 'text')->get();

        return $this->manipulateTranslations($translations);
    }
}
