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
        'file_type', // invoices, members, staffs, sops, assessments, receipts, letters, annual_progress_reports
        'status' // 0=unavailable, 1=available, 2=approved, default=1
    ];

    public function getFile()
    {
        return $this->belongsTo(UploadedFile::class, 'file_id');
    }
}
