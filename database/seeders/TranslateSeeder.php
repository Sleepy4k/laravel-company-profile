<?php

namespace Database\Seeders;

use App\Models\Translate;
use Illuminate\Database\Seeder;

class TranslateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Translate::count() == 0) {
            $languages = config('translate.list');

            if (empty($languages)) {
                throw new \Exception('Error: config/translate.php not found and defaults could not be merged. Please publish the package configuration before proceeding, or drop the tables manually.');
            }

            $language = collect($languages)->map(function ($lang) {
                $lang['uuid'] = \Illuminate\Support\Str::uuid();
                $lang['text'] = json_encode($lang['text']);
                $lang['created_at'] = now();
                $lang['updated_at'] = now();

                return $lang;
            });

            Translate::insert($language->toArray());
        }
    }
}
