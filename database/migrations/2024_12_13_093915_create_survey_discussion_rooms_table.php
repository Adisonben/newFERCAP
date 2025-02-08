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
        Schema::create('survey_discussion_rooms', function (Blueprint $table) {
            $table->id();
            $table->uuid('room_id')->unique();
            $table->foreignId('survey_id')->constrained("surveys")->cascadeOnDelete();
            $table->string('room_title');
            $table->string('room_type');
            $table->string('target_role');
            $table->foreignId('created_by')->nullable()->constrained("users")->nullOnDelete();
            $table->integer('status')->default(1)->comment('0=close, 1=open, 2=approved, 3=reject');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_discussion_rooms');
    }
};
