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
        Schema::create('rec_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('file_id')->nullable()->constrained("uploaded_files")->nullOnDelete();
            $table->foreignId('recognition_id')->constrained("recognitions")->cascadeOnDelete();
            $table->string('description')->nullable();
            $table->string('file_type')->nullable();
            $table->integer('status')->comment('0=unavailable, 1=available, 2=approved')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rec_files');
    }
};
