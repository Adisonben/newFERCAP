<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserInfoRequest;
use App\Models\AppCountry;
use App\Models\AppNationality;
use App\Models\AppUserInfo;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Users/UserPage');
    }

    public function fillMoreInfo () {
        $nationalities = AppNationality::all();
        $countries = AppCountry::all();
        return Inertia::render('FillMoreInfo', [
            'nationalities' => $nationalities,
            'countries' => $countries
        ]);
    }

    public function storeUserInfo(UserInfoRequest $request)
    {
        try {
            $userInfoData = $request->validated();
            $userInfoData['user_id'] = Auth::user()->id;
            AppUserInfo::create($userInfoData);
            User::where('id', Auth::user()->id)->update([
                "status" => 1
            ]);
            return to_route('dashboard');
        } catch (\Throwable $th) {
            // throw $th;
            return redirect()->back()->with(['error' => $th->getMessage(),]);
        }
    }
}
