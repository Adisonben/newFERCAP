<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recognition extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'recognition_id',
        'created_by',
        'institute',
        'ec_name',
        'address',
        'city',
        'state_province_region',
        'zip_code',
        'country',
        'phone',
        'website',
        'contact_person',
        'contact_email',
        'contact_position',
        'chairperson',
        'chairperson_email',
        'secretary',
        'secretary_email',
        'protocol_board_review',
        'protocol_expedited_review',
        'protocol_board_meeting',
        'avg_members_per_meeting',
        'ethical_challenges',
        'propose_survey_start_date',
        'propose_survey_end_date',
        'expire_date',
        'status'
    ];
}
