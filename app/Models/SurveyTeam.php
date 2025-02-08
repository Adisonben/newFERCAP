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
        'status', // 0=Removed, 1=Member, default=1
        'selected_by'
    ];

    public function getUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getRole()
    {
        return $this->belongsTo(AppRole::class, 'role_id');
    }
}
