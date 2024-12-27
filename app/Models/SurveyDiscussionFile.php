<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyDiscussionFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'room_id',
        'comment_id',
        'status'
    ];
}
