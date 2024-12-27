<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_id',
        'recognition_id',
        'description',
        'file_type',
        'status'
    ];
}
