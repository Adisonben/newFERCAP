<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppFercapGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_name',
        'status',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'app_fercap_group_has_users', 'group_id', 'user_id');
    }

    protected $appends = ['user_list'];
    public function getUserListAttribute()
    {
        return $this->users()->get()->pluck('full_name');
    }
}
