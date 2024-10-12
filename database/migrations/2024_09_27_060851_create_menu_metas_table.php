<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menu_metas', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('translation_key')->nullable();
            $table->string('route')->nullable();
            $table->string('permission')->nullable();
            $table->string('parameters')->nullable();
            $table->string('active_routes')->nullable();
            $table->boolean('is_sortable')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_metas');
    }
};
