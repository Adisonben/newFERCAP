<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyDiscussionComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'created_by',
        'content',
        'type'
    ];
}
