<?php

namespace App\Http\Controllers;

use App\Models\AppProtocolType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProtocolTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $protocolTypes = AppProtocolType::orderByDesc('created_at')->get();
        return Inertia::render('ProtocolType/ProtocolTypePage', [
            'success' => session('success') ?? null,
            'error' => session('error') ?? null,
            'protocolTypes' => $protocolTypes,
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
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ordering' => 'required|integer|max_digits:7',
        ]);

        try {
            AppProtocolType::create([
                'name' => $request->name,
                'ordering' => $request->ordering,
                'status' => true,
            ]);

            return to_route('protocol-types.index')->with('success', [
                'message' => 'Protocol Type created successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('protocol-types.index')->with('error', [
                'message' => 'An error occurred while creating the Protocol Type',
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
            'ordering' => 'required|integer|max_digits:7',
        ]);

        try {
            AppProtocolType::where('id', $id)->update([
                'name' => $request->name,
                'ordering' => $request->ordering,
            ]);

            return to_route('protocol-types.index')->with('success', [
                'message' => 'Protocol Type updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('protocol-types.index')->with('error', [
                'message' => 'An error occurred while updating the Protocol Type',
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
            AppProtocolType::where('id', $id)->delete();
            return to_route('protocol-types.index')->with('success', [
                'message' => 'Protocol Type deleted successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('protocol-types.index')->with('error', [
                'message' => 'An error occurred while deleting the Protocol Type',
                'timestamp' => now()->toISOString()
            ]);
        }
    }

    public function toggleStatus(string $id)
    {
        try {
            $protocolType = AppProtocolType::where('id', $id)->first();
            $protocolType->status = !$protocolType->status;
            $protocolType->save();

            return to_route('protocol-types.index')->with('success', [
                'message' => 'Protocol Type status updated successfully',
                'timestamp' => now()->toISOString()
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return to_route('protocol-types.index')->with('error', [
                'message' => 'An error occurred while updating the Protocol Type status',
                'timestamp' => now()->toISOString()
            ]);
        }
    }
}
