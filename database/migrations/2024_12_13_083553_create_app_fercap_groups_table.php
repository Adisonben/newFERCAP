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
        Schema::create('app_fercap_groups', function (Blueprint $table) {
            $table->id();
            $table->string('group_name');
            $table->boolean('status')->default(true)->comment('0 = disable, 1 = enable');
            $table->timestamps();
        });

        Schema::create('app_fercap_group_has_users', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained("users")->cascadeOnDelete();
            $table->foreignId('group_id')->constrained('app_fercap_groups')->cascadeOnDelete();
            $table->boolean('status')->default(true)->comment('0 = inactive, 1 = active');
            $table->timestamps();

            $table->primary(['user_id', 'group_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_fercap_groups');
        Schema::dropIfExists('app_fercap_group_has_users');
    }
};
