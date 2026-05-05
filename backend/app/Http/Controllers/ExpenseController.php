<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::all();

        return response()->json($expenses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required',
            'description' => 'required',
            'category' => 'required',
            'supplier' => 'required',
            'metod' => 'required',
            'amount' => 'required',
            'state' => 'required',
        ]);

        $expense = Expense::create([
            'date' => $request->date, 
            'description' => $request->description, 
            'category' => $request->category, 
            'supplier' => $request->supplier, 
            'metod' => $request->metod, 
            'amount' => $request->amount, 
            'state' => $request->state, 
        ]);

        return response()->json($expense, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $expense = Expense::findOrFail($id);

        return response()->json($expense);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'date' => 'required',
            'description' => 'required',
            'category' => 'required',
            'supplier' => 'required',
            'metod' => 'required',
            'amount' => 'required',
            'state' => 'required',
        ]);

        $expense = Expense::findOrFail($id);

        $expense->update($validated);

        return response()->json($expense);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();
        return response()->json([
            'message' => 'Deleted succesfully'
        ], 200);
    }
}
