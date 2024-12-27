<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecognitionHasProtocol extends Model
{
    use HasFactory;

    protected $fillable = [
        'recognition_id',
        'protocols_id',
        'review_type',
        'number'
    ];
}
