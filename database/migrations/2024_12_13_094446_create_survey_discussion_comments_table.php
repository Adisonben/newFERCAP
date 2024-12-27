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
        Schema::create('survey_discussion_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained("survey_discussion_rooms")->cascadeOnDelete();
            $table->foreignId('created_by')->constrained("users")->nullOnDelete();
            $table->text('content');
            $table->string('type')->comment('text || file')->default('text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_discussion_comments');
    }
};
