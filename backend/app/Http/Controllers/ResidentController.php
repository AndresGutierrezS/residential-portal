<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\ApartmentPerson;
use App\Models\Person;
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
            'name' => 'required|string',
            'last_name' => 'required|string',
            'second_last_name' => 'nullable|string',
            'phone' => 'required|string',
            'email' => 'required',
            'role_id' => 'required|exists:roles,id',
            'code' => 'required|string|exists:apartments,code',
        ]);

        try {
            $person = Person::create([
                'name' => $request->name,
                'last_name' => $request->last_name,
                'second_last_name' => $request->second_last_name,
                'phone' => $request->phone,
                'is_active' => true,
            ]);
    
            $apartment = Apartment::where('code', $request->code)->firstOrFail();
    
            $resident = ApartmentPerson::create([
                'person_id' => $person->id,
                'apartment_id' => $apartment->id,
                'role_id' => $request->role_id,
                'is_resident' => true,
                'code' => $request->code,
            ]);
    
            return response()->json($resident, 201);

        } catch (\Exception $e) {
            
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
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
