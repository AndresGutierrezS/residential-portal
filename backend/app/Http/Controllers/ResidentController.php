<?php

namespace App\Http\Controllers;

use App\Models\ApartmentPerson;
use Illuminate\Http\Request;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $residents = ApartmentPerson::with(['person', 'apartment', 'role'])
            ->where('is_resident', true)
            ->get();

        return response()->json($residents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'person_id' => 'required|exists:people,id',
            'apartment_id' => 'required|exists:apartments,id',
            'role_id' => 'required|exists:roles,id',
            'code' => 'nullable|string|max:50',
        ]);

        $resident = ApartmentPerson::create([
            'person_id' => $request->person_id,
            'apartment_id' => $request->apartment_id,
            'role_id' => $request->role_id,
            'is_resident' => true,
            'code' => $request->code,
        ]);

        return response()->json($resident, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $resident = ApartmentPerson::findOrFail($id);

        $request->validate([
            'role_id' => 'sometimes|exists:roles,id',
            'code' => 'nullable|string|max:50',
            'is_resident' => 'sometimes|boolean',
        ]);

        $resident->update($request->only(['role_id', 'code', 'is_resident']));

        return response()->json($resident);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $resident = ApartmentPerson::findOrFail($id);
        $resident->delete();

        return response()->json(['message' => 'Resident removed successfully']);
    }

    public function residentsByApartment($apartment_id)
    {
        $residents = ApartmentPerson::with(['person', 'role'])
            ->where('apartment_id', $apartment_id)
            ->where('is_resident', true)
            ->get();

        return response()->json($residents);
    }
}
