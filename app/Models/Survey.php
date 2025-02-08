<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Survey extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'survey_id',
        'recognition_id',
        'created_by',
        'description',
        'start_date',
        'end_date',
        'fercap_group',
        'status'  // 0=close, 1=ongoing, 2=complete, 3=fail, default=1
    ];

    public function fercapGroup()
    {
        return $this->belongsTo(AppFercapGroup::class, 'fercap_group')->select('id', 'group_name');
    }

    public function recognition()
    {
        return $this->belongsTo(Recognition::class, 'recognition_id');
    }

    public function simpRecognition()
    {
        return $this->recognition()->select('id', 'recognition_id', 'institute');
    }

    public function surveyors()
    {
        return $this->hasMany(SurveyorList::class, 'survey_id');
    }

    public function surveyTeam()
    {
        return $this->hasMany(SurveyTeam::class, 'survey_id');
    }

    public function isSurveyor()
    {
        return $this->surveyors()->where('user_id', Auth::user()->id)->select('status', 'survey_id')->one();
    }

    public function isSurveyorTeam()
    {
        return $this->surveyTeam()->where('user_id', Auth::user()->id)->select('status', 'survey_id')->one();
    }
}
