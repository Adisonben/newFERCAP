<?php

namespace Database\Seeders;

use App\Models\AppRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            // user role
            [
                'name' => 'Admin',
                'codename' => 'admin',
                'role_type' => 'user',
            ],
            [
                'name' => 'Moderator',
                'codename' => 'moderator',
                'role_type' => 'user',
            ],
            [
                'name' => 'FERCAP',
                'codename' => 'fercap',
                'role_type' => 'user',
            ],
            [
                'name' => 'Ethic Committee',
                'codename' => 'ec',
                'role_type' => 'user',
            ],
            [
                'name' => 'Surveyor',
                'codename' => "surveyor",
                'role_type' => 'user',
            ],

            // Survey team role
            [
                'name' => 'Unassigned',
                'codename' => "unassigned",
                'role_type' => 'surveyTeam',
            ],
            [
                'name' => 'Lead Surveyor',
                'codename' => "leadSurveyor",
                'role_type' => 'surveyTeam',
            ],
            [
                'name' => 'Survey Coordinator',
                'codename' => "surveyCoordinator",
                'role_type' => 'surveyTeam',
            ],
            [
                'name' => 'Foreign Surveyor',
                'codename' => "foreignSurveyor",
                'role_type' => 'surveyTeam',
            ],
            [
                'name' => 'Local Surveyor',
                'codename' => "localSurveyor",
                'role_type' => 'surveyTeam',
            ],
            [
                'name' => 'Local Coordinator',
                'codename' => "localCoordinator",
                'role_type' => 'surveyTeam',
            ],
        ];

        try {
            foreach ($roles as $key => $role) {
                AppRole::create($role);
            }
        } catch (\Throwable $th) {
            //throw $th;
            echo "---------- RoleSeeder error : " . $th->getMessage() . " ----------\n";
        }
    }
}
