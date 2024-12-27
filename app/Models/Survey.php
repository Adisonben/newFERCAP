<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
        'status'
    ];
}
