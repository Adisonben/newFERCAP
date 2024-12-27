<?php

namespace App\Http\Controllers;

use App\Models\AppFercapGroup;
use App\Models\AppFercapGroupHasUser;
use Illuminate\Http\Request;

class FercapGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $fercapGroups = AppFercapGroup::orderByDesc('created_at')->get();
        return inertia('FercapGroup/FercapGroupPage', [
            'resFormBack' => session('resFormBack') ?? null,
            'fercapGroups' => $fercapGroups,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $newFercapGroup = AppFercapGroup::create([
                'group_name' => $request->name,
                'status' => true,
            ]);

            if (is_array($request->user_list)) {
                foreach ($request->user_list ?? [] as $value) {
                    AppFercapGroupHasUser::create([
                        'user_id' => $value,
                        'group_id' => $newFercapGroup->id,
                    ]);
                }
            }

            return to_route('fercap-groups.index')->with('resFormBack', [
                'success' => 'Fercap Group created successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('fercap-groups.index')->with('resFormBack', [
                'error' => 'An error occurred while creating the Fercap Group',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            AppFercapGroup::where('id', $id)->update([
                'group_name' => $request->name,
            ]);

            AppFercapGroupHasUser::where('group_id', $id)->whereNotIn('user_id', $request->user_list)->delete();
            foreach ($request->user_list as $userId) {
                if (AppFercapGroupHasUser::where('group_id', $id)->where('user_id', $userId)->doesntExist()) {
                    AppFercapGroupHasUser::create([
                        'user_id' => $userId,
                        'group_id' => $id,
                    ]);
                }
            }

            return to_route('fercap-groups.index')->with('resFormBack', [
                'success' => 'FERCAP Group updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('fercap-groups.index')->with('resFormBack', [
                'error' => 'An error occurred while updating the FERCAP Group',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            AppFercapGroup::where('id', $id)->delete();
            return to_route('fercap-groups.index')->with('resFormBack', [
                'success' => 'FERCAP Group deleted successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('fercap-groups.index')->with('resFormBack', [
                'error' => 'An error occurred while deleting the FERCAP Group',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function toggleStatus(string $id)
    {
        try {
            $protocolType = AppFercapGroup::where('id', $id)->first();
            $protocolType->status = !$protocolType->status;
            $protocolType->save();

            return to_route('fercap-groups.index')->with('resFormBack', [
                'success' => 'FERCAP Group status updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('fercap-groups.index')->with('resFormBack', [
                'error' => 'An error occurred while updating the FERCAP Group status',
                'timestamp' => now()->toISOString()
            ]);
        }
    }
}
