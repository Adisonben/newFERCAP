<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppRole extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'codename',
        'role_type',
    ];
}
