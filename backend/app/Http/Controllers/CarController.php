<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::with('apartment')->get();
        
        return response()->json([
            'data' => $cars
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'plate' => 'required|string|max:20',
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'color' => 'required|string|max:30',
        ]);

        $car = Car::create($validated);

        return response()->json([
            'message' => 'Car created succesfully',
            'data' => $car
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::findOrFail($id);

        return response()->json([
            'data' => $car
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $car = Car::findOrFail($id);

        $validated = $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'plate' => 'required|string|max:20',
            'brand' => 'required|string|max:50',
            'model' => 'required|string|max:50',
            'color' => 'required|string|max:30',
        ]);

        $car->update($validated);

        return response()->json([
            'message' => 'Car updated succesfully',
            'data' => $car
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::findOrFail($id);

        $car->delete();

        return response()->json([
            'message' => 'Car deleted succesfully'
        ], 200);
    }
}
