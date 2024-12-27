<?php

namespace Database\Seeders;

use App\Models\AppRole;
use App\Models\AppUserInfo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        try {
            $role = AppRole::where('codename', 'admin')->first();
            $user = User::create([
                'user_id' => Str::uuid(),
                'role_id' => $role->id,
                'email' => "admin@iddrives",
                'password' => Hash::make('iddrivesadmin'),
            ]);
            AppUserInfo::create([
                'user_id' => $user->id,
                'first_name' => "Admin",
                'last_name' => "Fercap",
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            echo "---------- UserSeeder error : " . $th->getMessage() . " ----------\n";
        }
    }
}
