<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AppUserInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'nationality',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'institute',
        'education',
        'job_title',
        'job_organization',
        'ec_position',
        'ec_name',
        'experience',
        'training',
        'english_skill_reading',
        'english_skill_speaking',
        'english_skill_writing',
        'local_skill_reading',
        'local_skill_speaking',
        'local_skill_writing',
        'other_languages',
    ];
}
