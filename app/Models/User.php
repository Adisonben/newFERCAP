<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'role_id',
        'email',
        'password',
        'status'  // 0 = inactivate, 1 = activate, 2 = deleted, 3 = uncomplete
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function userDetail()
    {
        return $this->hasOne(AppUserInfo::class);
    }

    public function userRole()
    {
        return $this->hasOne(AppRole::class, 'id', 'role_id');
    }

    protected $appends = ['full_name', 'role_name'];
    public function getFullNameAttribute()
    {
        return $this->userDetail ? $this->userDetail->first_name . ' ' . $this->userDetail->last_name : '';
    }

    public function getRoleNameAttribute()
    {
        return $this->userRole ? $this->userRole->name : '';
    }

    public function fercapGroups()
    {
        return $this->belongsToMany(AppFercapGroup::class, 'app_fercap_group_has_users', 'user_id', 'group_id')->withPivot('status');
    }
}
