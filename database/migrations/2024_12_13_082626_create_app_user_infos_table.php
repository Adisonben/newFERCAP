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
        Schema::create('app_user_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone')->nullable();
            $table->string('nationality')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('country')->nullable();
            $table->string('institute')->nullable();
            $table->text('education')->nullable();
            $table->string('job_title')->nullable();
            $table->string('job_organization')->nullable();
            $table->string('ec_position')->nullable();
            $table->string('ec_name')->nullable();
            $table->text('experience')->nullable();
            $table->text('training')->nullable();
            $table->string('english_skill_reading')->nullable();
            $table->string('english_skill_speaking')->nullable();
            $table->string('english_skill_writing')->nullable();
            $table->string('local_skill_reading')->nullable();
            $table->string('local_skill_speaking')->nullable();
            $table->string('local_skill_writing')->nullable();
            $table->string('other_languages')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_user_infos');
    }
};
