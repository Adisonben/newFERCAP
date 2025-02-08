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
        'status'  // 0=reject, 1=simple, 2=approved default=1
    ];

    public function getFileData()
    {
        return $this->belongsTo(UploadedFile::class, 'file_id')->select('id', 'folder', 'file_name', 'original_name', 'size');
    }
}
