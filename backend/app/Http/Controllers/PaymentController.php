<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Models\Maintenance;
use App\Models\Payment;
use App\Models\PaymentReason;
use App\Models\PaymentType;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Payment::with([
            'apartment',
            'paymentType',
            'paymentReason',
            'report',
            'maintenance'
        ]);

        if ($request->payment_type_id) {
            $query->where('payment_type_id', $request->payment_type_id);
        }

        if (!is_null($request->is_paid)) {
            $query->where('is_paid', $request->is_paid);
        }

        return response()->json($query->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $data = $request->validated();

        $payment = Payment::create($data);

        // si es mantenimiento
        $type = PaymentType::find($data['payment_type_id']);

        if ($type && $type->type === 'Maintenance') {
            Maintenance::create([
                'payment_id' => $payment->id,
                'month' => $data['month'],
                'year' => $data['year'],
                'amount' => $payment->amount,
                'completed' => $payment->is_paid,
            ]);
        }

        return response()->json($payment->load([
            'paymentType',
            'paymentReason',
            'maintenance'
        ]), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $payment = Payment::with([
            'apartment',
            'paymentType',
            'paymentReason',
            'report',
            'maintenance'
        ])->findOrFail($id);

        return response()->json($payment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePaymentRequest $request, $id)
    {
        $payment = Payment::findOrFail($id);
        $payment->update($request->validated());

        if ($payment->maintenance) {
            $payment->maintenance->update([
                'amount' => $payment->amount,
                'completed' => $payment->is_paid,
            ]);
        }

        return response()->json($payment->load('maintenance'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function getTypes()
    {
        return PaymentType::all();
    }

    public function getReasons(Request $request)
    {
        return PaymentReason::where('payment_type_id', $request->payment_type_id)->get();
    }
}
