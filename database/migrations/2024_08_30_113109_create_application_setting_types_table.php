<?php

use App\Enum\SettingTypeCategory;
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
        // Get all the values from the enum
        $category = SettingTypeCategory::toArray();

        Schema::create('application_setting_types', function (Blueprint $table) use ($category) {
            $table->id();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->enum('category', $category);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_setting_types');
    }
};
