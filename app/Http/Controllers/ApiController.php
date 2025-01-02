<?php

namespace App\Http\Controllers;

use App\Http\Resources\SelectUserResource;
use App\Models\AppFercapGroupHasUser;
use App\Models\AppRole;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function getSelectUser(Request $request) {
        $users = User::whereNot('role_id', 1)->get();
        return SelectUserResource::collection($users);
    }

    public function groupUserList($id) {
        $groupUsers = AppFercapGroupHasUser::where('group_id', $id)->get()->pluck('user_id');
        return $groupUsers;
    }

    public function getRoles() {
        $roles = AppRole::where('role_type', 'user')->get(['id', 'name'])->toArray();
        return $roles;
    }
}
