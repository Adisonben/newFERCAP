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

    public function getUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getFile()
    {
        return $this->hasOne(SurveyDiscussionFile::class, 'comment_id')->with('getFileData')->select('id', 'comment_id', 'file_id', 'status');
    }
}
