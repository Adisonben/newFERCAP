<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyDiscussionRoom extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'survey_id',
        'room_title',
        'target_role',
        'created_by',
        'status'
    ];
}
