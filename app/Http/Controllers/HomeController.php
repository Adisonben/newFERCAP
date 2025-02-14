<?php

namespace App\Http\Controllers;

use App\Models\AppRole;
use App\Models\Recognition;
use App\Models\Survey;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function dashboard() {
        if (Auth::user()->status === 3) {
            return redirect()->route('user.info.fill');
        } else {
            $ec_role = AppRole::where('codename', 'ec')->first();
            $surveyor_role = AppRole::where('codename', 'surveyor')->first();

            $total_recognition = Recognition::count();
            $total_ongoing_surveys = Survey::where('status', 1)->count();
            $total_ec_member = User::where('role_id', $ec_role->id)->count();
            $total_surveyor_member = User::where('role_id', $surveyor_role->id)->count();

            $lastest_surveys = Survey::orderBy('created_at', 'desc')->with('simpRecognition')->limit(10)->get();
            $lastest_recognitions = Recognition::orderBy('created_at', 'desc')->limit(10)->get(['id', 'ec_name', 'created_at', 'institute', 'status', 'recognition_id']);

            $this_day_recognition = Recognition::whereDate('created_at', date('Y-m-d'))->count();
            $this_day_ongoing_surveys = Survey::whereDate('created_at', date('Y-m-d'))->where('status', 1)->count();
            $this_day_ec_member = User::where('role_id', $ec_role->id)->whereDate('created_at', date('Y-m-d'))->count();
            $this_day_surveyor_member = User::where('role_id', $surveyor_role->id)->whereDate('created_at', date('Y-m-d'))->count();

            return Inertia::render('Dashboard', [
                'total_recognition' => $total_recognition,
                'total_ongoing_surveys' => $total_ongoing_surveys,
                'total_ec_member' => $total_ec_member,
                'total_surveyor_member' => $total_surveyor_member,

                'lastest_surveys' => $lastest_surveys,
                'lastest_recognitions' => $lastest_recognitions,

                'inc_recognition' => $this_day_recognition,
                'inc_ongoing_surveys' => $this_day_ongoing_surveys,
                'inc_ec_member' => $this_day_ec_member,
                'inc_surveyor_member' => $this_day_surveyor_member,
            ]);
        }
    }
    public function welcome() {
        return Inertia::render('Welcome');
    }
}
