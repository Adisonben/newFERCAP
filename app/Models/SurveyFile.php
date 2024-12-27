<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'survey_id',
        'file_type',
        'status'
    ];
}
