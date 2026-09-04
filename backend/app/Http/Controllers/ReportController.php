<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\ApartmentPerson;
use App\Models\Maintenance;
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

    public function residents()
    {
        $residents = ApartmentPerson::with([
            'person',
            'apartment',
            'role'
        ])
        ->where('is_resident', true)
        ->get();

        return response()->json($residents);
    }

    public function apartments()
    {
        $apartments = Apartment::with([
            'apartmentPeople.person',
            'apartmentPeople.role'
        ])->get();

        return response()->json($apartments);
    }

    public function maintenance()
    {
        $maintenance = Maintenance::with([
            'payment.apartment',
            'payment.paymentReason',
        ])->get();

        return response()->json($maintenance);
    }
}
