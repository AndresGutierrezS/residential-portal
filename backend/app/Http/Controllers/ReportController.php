<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function payments()
    {
        $payments = Payment::with([
            'apartment',
            'paymentType',
            'paymentReason',
            'maintenance'
        ])->get();

        return response()->json($payments);
    }
}
