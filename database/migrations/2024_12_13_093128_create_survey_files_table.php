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
        Schema::create('survey_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->constrained("uploaded_files")->nullOnDelete();
            $table->foreignId('survey_id')->constrained("surveys")->cascadeOnDelete();
            $table->string('file_type')->nullable();
            $table->integer('status')->comment('0=reject, 1=normal, 2=approved')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_files');
    }
};
