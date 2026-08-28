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
            'person_id' => 'required|exists:people,id',
            'apartment_id' => 'required|exists:apartments,id',
            'role_id' => 'required|exists:roles,id',
            'is_resident' => 'required|boolean'
        ]);

        $person = Person::findOrFail($request->person_id);

        if($person->apartmentPeople()->exists()) {
            return response()->json([
                'message' => 'La persona ya se encuentra asignada a un apartmento'
            ], 409);
        }

        try {

            $apartment = Apartment::findOrFail($request->apartment_id);

            $resident = ApartmentPerson::create([
                'person_id' => $person->id,
                // 'apartment_id' => $request->apartment_id,
                'apartment_id' => $apartment->id,
                'role_id' => $request->role_id,
                'is_resident' => $request->is_resident,
                'code' => $apartment->code
            ]);

            return response()->json(
                $resident->load(['person', 'apartment', 'role']),
                201
            );

        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
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
            $resident = ApartmentPerson::findOrFail($id);

            $resident->person->update([
                'name' => $request->name,
                'last_name' => $request->last_name,
                'second_last_name' => $request->second_last_name,
                'phone' => $request->phone,
            ]);

            $apartment = Apartment::where('code', $request->code)->firstOrFail();

            $resident->update([
                'apartment_id' => $apartment->id,
                'role_id' => $request->role_id,
            ]);

            return response()->json($resident->load(['person', 'apartment', 'role']));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $resident = ApartmentPerson::findOrFail($id);

            $resident->delete();

            return response()->json([
                'message' => 'Residente eliminado'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function residentsByApartment($apartment_id)
    {
        $residents = ApartmentPerson::with(['person', 'role'])
            ->where('apartment_id', $apartment_id)
            ->where('is_resident', true)
            ->get();

        return response()->json($residents);
    }

    public function pending()
    {
        $people = Person::with('user')
            ->whereHas('user')
            ->whereDoesntHave('apartmentPeople')
            ->get();

        return response()->json($people);
    }

    public function roles()
    {
        return response()->json(
            \App\Models\Role::all()
        );
    }

}
