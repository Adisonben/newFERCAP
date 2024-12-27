<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppCountry extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code'
    ];

    public static function createIfNotExists($countryData)
    {
        $existingCountry = self::where('name', $countryData['name'])->first();

        if ($existingCountry) {
            return $existingCountry;
        }

        return self::create($countryData);
    }
}
