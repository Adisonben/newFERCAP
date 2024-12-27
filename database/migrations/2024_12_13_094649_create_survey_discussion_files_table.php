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
        Schema::create('survey_discussion_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained("uploaded_files")->nullOnDelete();
            $table->foreignId('room_id')->constrained("survey_discussion_rooms")->cascadeOnDelete();
            $table->foreignId('comment_id')->constrained("survey_discussion_comments")->cascadeOnDelete();
            $table->integer('status')->comment('0=reject, 1=simple, 2=approved')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_discussion_files');
    }
};
