<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyTeam extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'user_id',
        'role_id',
        'status',
        'selected_by'
    ];
}
