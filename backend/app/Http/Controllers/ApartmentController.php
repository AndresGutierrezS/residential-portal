<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use Illuminate\Http\Request;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $apartments = Apartment::all();

        return response()->json($apartments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
  
        $request->validate([
            'code' => 'required|string',
            'status' => 'required|string',
        ]);

        $apartment = Apartment::create([
            'name' => 'Apartamento ' . $request->code,
            'code' => $request->code,
            'is_overdue' => false,
            'status' => $request->status,
        ]);

        return response()->json($apartment, 201);
  
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(
            Apartment::findOrFail($id)
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'code' => 'sometimes|string', 
            'is_overdue' => 'sometimes|boolean', 
            'status' => 'sometimes|string', 
        ]);

        $apartment = Apartment::findOrFail($id);

        $apartment->update([
            'code' => $request->code,
            'name' => 'Apartamento ' . $request->code,
            'is_overdue' => $request->is_overdue,
            'status' => $request->status,
        ]);

        return response()->json($apartment, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $apartment = Apartment::findOrFail($id);

        $apartment->delete();

        return response()->json([
            'message' => 'Apartmento Borrado Exitosamente'
        ], 200);
    }
}
