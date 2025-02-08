<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    use HasFactory;

    protected $fillable = [
        'folder',
        'file_name',
        'original_name',
        'size', // Bytes
        'extension',
        'uploaded_by'
    ];
}
