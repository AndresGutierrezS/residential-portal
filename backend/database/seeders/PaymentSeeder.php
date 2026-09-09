<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        $maintenance = DB::table('payment_types')
            ->where('type', 'Maintenance')
            ->value('id');

        $fine = DB::table('payment_types')
            ->where('type', 'Fine')
            ->value('id');

        $reservation = DB::table('payment_types')
            ->where('type', 'Reservation')
            ->value('id');

        $service = DB::table('payment_types')
            ->where('type', 'Service')
            ->value('id');

        $maintenanceReason = DB::table('payment_reasons')
            ->where('payment_type_id', $maintenance)
            ->where('reason', 'Monthly fee')
            ->value('id');

        $fineReason = DB::table('payment_reasons')
            ->where('payment_type_id', $fine)
            ->where('reason', 'Noise')
            ->value('id');

        $reservationReason = DB::table('payment_reasons')
            ->where('payment_type_id', $reservation)
            ->where('reason', 'Event hall reservation')
            ->value('id');

        $serviceReason = DB::table('payment_reasons')
            ->where('payment_type_id', $service)
            ->where('reason', 'Water bill')
            ->value('id');

        $apartmentA101 = DB::table('apartments')
            ->where('code', 'A-101')
            ->value('id');

        $apartmentA102 = DB::table('apartments')
            ->where('code', 'A-102')
            ->value('id');

        $apartmentA201 = DB::table('apartments')
            ->where('code', 'A-201')
            ->value('id');

        $apartmentC203 = DB::table('apartments')
            ->where('code', 'C-203')
            ->value('id');

        $maintenanceReport = DB::table('reports')
            ->where('content', 'Monthly report for building maintenance')
            ->value('id');

        $incidentReport = DB::table('reports')
            ->where('content', 'Incident report: noise complaint')
            ->value('id');

        $reservationReport = DB::table('reports')
            ->where('content', 'Reservation usage report')
            ->value('id');

        DB::table('payments')->insert([
            [
                'apartment_id' => $apartmentA101,
                'amount' => 1200.00,
                'payment_type_id' => $maintenance,
                'date' => Carbon::now()->subDays(10),
                'payment_reason_id' => $maintenanceReason,
                'description' => 'Monthly maintenance April',
                'receipt' => 'receipt_maintenance_1.jpg',
                'is_paid' => true,
                'report_id' => $maintenanceReport,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'apartment_id' => $apartmentA102,
                'amount' => 1200.00,
                'payment_type_id' => $maintenance,
                'date' => Carbon::now()->subDays(3),
                'payment_reason_id' => $maintenanceReason,
                'description' => 'Monthly maintenance May',
                'receipt' => 'receipt_maintenance_2.jpg',
                'is_paid' => false,
                'report_id' => $maintenanceReport,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'apartment_id' => $apartmentA102,
                'amount' => 500.00,
                'payment_type_id' => $fine,
                'date' => Carbon::now()->subDays(5),
                'payment_reason_id' => $fineReason,
                'description' => 'Noise complaint fine',
                'receipt' => 'receipt_fine_1.jpg',
                'is_paid' => false,
                'report_id' => $incidentReport,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'apartment_id' => $apartmentA201,
                'amount' => 2000.00,
                'payment_type_id' => $reservation,
                'date' => Carbon::now()->subDays(2),
                'payment_reason_id' => $reservationReason,
                'description' => 'Event hall booking',
                'receipt' => 'receipt_reservation_1.jpg',
                'is_paid' => true,
                'report_id' => $reservationReport,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'apartment_id' => $apartmentC203,
                'amount' => 750.00,
                'payment_type_id' => $service,
                'date' => Carbon::now(),
                'payment_reason_id' => $serviceReason,
                'description' => 'Water bill payment',
                'receipt' => 'receipt_service_1.jpg',
                'is_paid' => true,
                'report_id' => $reservationReport,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}