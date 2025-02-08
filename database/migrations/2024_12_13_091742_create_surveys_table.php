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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->uuid('survey_id')->unique();
            $table->foreignId('recognition_id')->constrained("recognitions")->cascadeOnDelete();
            $table->foreignId('created_by')->nullable()->constrained("users")->nullOnDelete();
            $table->text('description')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->foreignId('fercap_group')->nullable()->constrained("app_fercap_groups")->nullOnDelete();
            $table->integer('status')->comment('0=close, 1=ongoing, 2=complete, 3=fail')->default(1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
