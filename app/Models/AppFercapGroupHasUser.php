<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppFercapGroupHasUser extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $primaryKey = null;
    public $timestamps = true;
    protected $fillable = [
        'user_id',
        'group_id',
        'status' // true = inactive, false = active | default=true
    ];
}
