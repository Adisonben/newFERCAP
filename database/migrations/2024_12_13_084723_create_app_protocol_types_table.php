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
        Schema::create('app_protocol_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('ordering')->nullable();
            $table->boolean('status')->default(true)->comment('false=disable, true=active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_protocol_types');
    }
};
