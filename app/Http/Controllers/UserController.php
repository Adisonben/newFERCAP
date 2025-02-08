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
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function index()
    {
        $users = User::whereNot('email', "admin@iddrives")->orderByDesc('created_at')->get(['id', 'email', 'status', 'role_id'])->toArray();
        return inertia('Users/UserPage', [
            'resFormBack' => session('resFormBack') ?? null,
            'users' => $users,
        ]);
    }

    public function fillMoreInfo () {
        $nationalities = AppNationality::all();
        $countries = AppCountry::all();
        return Inertia::render('FillMoreInfo', [
            'nationalities' => $nationalities,
            'countries' => $countries
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'role' => 'required|exists:app_roles,id',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        try {
            User::create([
                'role_id' => $request->role,
                'status' => 3,
                'user_id' => Str::uuid(),
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return to_route('users.index')->with('resFormBack', [
                'success' => 'User created successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            return to_route('users.index')->with('resFormBack', [
                'error' => 'An error occurred while creating the User',
                'timestamp' => now()->toISOString()
            ]);
        }
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
            return to_route('home');
        } catch (\Throwable $th) {
            // throw $th;
            return redirect()->back()->with(['error' => $th->getMessage(),]);
        }
    }

    public function updateUserInfo(UserInfoRequest $request)
    {
        $userInfoData = $request->validated();
        AppUserInfo::where('user_id', Auth::user()->id)->update($userInfoData);
        return to_route('profile.edit');
    }

    public function toggleStatus($userId)
    {
        try {
            $user = User::findOrFail($userId);
            $user->status = $user->status === 0 ? 1 : 0;
            $user->save();

            return Redirect::back()->with('resFormBack', [
                'success' => 'User status updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return Redirect::back()->with('resFormBack', [
                'error' => 'An error occurred while updating the User status',
                'timestamp' => now()->toISOString()
            ]);
        }
    }
}
