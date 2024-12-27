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
        Schema::create('recognition_has_protocols', function (Blueprint $table) {
            $table->foreignId('recognition_id')->constrained("recognitions")->cascadeOnDelete();
            $table->foreignId('protocols_id')->constrained('app_protocol_types')->cascadeOnDelete();
            $table->string('review_type')->comment('full board | expedited');
            $table->integer('number')->default(0);
            $table->timestamps();

            $table->primary(['recognition_id', 'protocols_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recognition_has_protocols');
    }
};
