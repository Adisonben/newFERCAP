<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyorList extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'user_id',
        'status' // 0=canceled, 1=joined
    ];

    public function getUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
