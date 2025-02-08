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
        'file_type', // public, private, report,  action_plan, evaluation
        'status' // 0=reject, 1=normal, 2=approved default 1
    ];

    public function getFileData()
    {
        return $this->belongsTo(UploadedFile::class, 'file_id')->select('id', 'folder', 'file_name', 'original_name', 'size');
    }
}
