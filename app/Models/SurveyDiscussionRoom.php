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
        'room_type',
        'target_role',
        'created_by',
        'status'
    ];

    public function getTargetRole() {
        return $this->belongsTo(AppRole::class, 'target_role', 'id')->select('id', 'codename');
    }
}
