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
        Schema::create('survey_teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained("surveys")->cascadeOnDelete();
            $table->foreignId('user_id')->constrained("users")->cascadeOnDelete();
            $table->foreignId('role_id')->nullable();
            $table->boolean('status')->default(1)->comment('0=withdrawn, 1=attended');
            $table->foreignId('selected_by')->nullable()->constrained("users")->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_teams');
    }
};
