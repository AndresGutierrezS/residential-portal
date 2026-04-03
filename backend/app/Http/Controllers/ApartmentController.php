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
                'name' => 'sometimes|string',
                'is_overdue' => 'sometimes|boolean', 
                'status' => 'sometimes|string', 
            ]);
    
            $apartment = Apartment::findOrFail($id);
        
            try {
                $data = $request->only(['code', 'status', 'is_overdue']);

                if ($request->has('code')) {
                    $data['name'] = 'Apartamento ' . $request->code;
                }

                if ($request->has('name')) {
                    $data['name'] = $request->name;
                }

                $apartment->update($data);

                return response()->json($apartment, 200);

            } catch (\Exception $e) {
                return response()->json([
                    'error' => $e->getMessage(),
                    'line' => $e->getLine(),
                ], 500);
            }
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
