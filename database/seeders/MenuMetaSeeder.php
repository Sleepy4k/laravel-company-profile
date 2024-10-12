<?php

namespace Database\Seeders;

use App\Models\MenuMeta;
use Illuminate\Database\Seeder;

class MenuMetaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (MenuMeta::query()->withoutCache()->count() == 0) {
            $metas = MenuMeta::factory()->make();

            MenuMeta::insert($metas->toArray());
        }
    }
}
