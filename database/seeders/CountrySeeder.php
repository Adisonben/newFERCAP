<?php

namespace Database\Seeders;

use App\Models\AppCountry;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $jsonData = Storage::disk('local2')->get('/data/countries.json');
            $countries = json_decode($jsonData, true);
            foreach ($countries as $country) {
                AppCountry::createIfNotExists($country);
            }
        } catch (\Throwable $th) {
            //throw $th;
            echo "---------- CountrySeeder error : " . $th->getMessage() . " ----------\n";
        }
    }
}
