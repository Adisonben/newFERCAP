<?php

namespace Database\Seeders;

use App\Models\AppNationality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class NationalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $jsonData = Storage::disk('local2')->get('/data/nationalities.json');
            $nationalities = json_decode($jsonData, true);
            foreach ($nationalities as $nationalityName) {
                AppNationality::create([
                    "name" => $nationalityName
                ]);
            }
        } catch (\Throwable $th) {
            //throw $th;
            echo "---------- NationalitySeeder error : " . $th->getMessage() . " ----------\n";
        }
    }
}
