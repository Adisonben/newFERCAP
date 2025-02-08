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
        Schema::create('recognitions', function (Blueprint $table) {
            $table->id();
            $table->uuid('recognition_id')->unique();
            $table->foreignId('created_by')->nullable()->constrained("users")->nullOnDelete();
            $table->string('institute');
            $table->string('ec_name');
            $table->string('address');
            $table->string('city');
            $table->string('state_province_region');
            $table->string('zip_code');
            $table->string('country');
            $table->string('phone');
            $table->string('website');
            $table->string('contact_person');
            $table->string('contact_email');
            $table->string('contact_position');
            $table->string('chairperson');
            $table->string('chairperson_email');
            $table->string('secretary');
            $table->string('secretary_email');
            $table->integer('protocol_board_review');
            $table->integer('protocol_expedited_review');
            $table->integer('protocol_board_meeting');
            $table->integer('avg_members_per_meeting');
            $table->text('ethical_challenges');
            $table->string('propose_survey_start_date')->nullable();
            $table->string('propose_survey_end_date')->nullable();
            $table->dateTime('expire_date')->nullable();
            $table->integer('status')->comment('0=disable, 1=active, 2=complete, 3=reject')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recognitions');
    }
};
