<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener IDs de tipos
        $maintenance = DB::table('payment_types')->where('type', 'Maintenance')->value('id');
        $fine = DB::table('payment_types')->where('type', 'Fine')->value('id');
        $reservation = DB::table('payment_types')->where('type', 'Reservation')->value('id');
        $service = DB::table('payment_types')->where('type', 'Service')->value('id');

        // Obtener reasons por tipo
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

        DB::table('payments')->insert([
            // Maintenance (importante para tu lógica de Maintenance model)
            [
                'apartment_id' => 4,
                'amount' => 1200.00,
                'payment_type_id' => $maintenance,
                'date' => Carbon::now()->subDays(10),
                'payment_reason_id' => $maintenanceReason,
                'description' => 'Monthly maintenance April',
                'receipt' => 'receipt_maintenance_1.jpg',
                'is_paid' => 1,
                'report_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Fine
            [
                'apartment_id' => 2,
                'amount' => 500.00,
                'payment_type_id' => $fine,
                'date' => Carbon::now()->subDays(5),
                'payment_reason_id' => $fineReason,
                'description' => 'Noise complaint fine',
                'receipt' => 'receipt_fine_1.jpg',
                'is_paid' => 0,
                'report_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Reservation
            [
                'apartment_id' => 3,
                'amount' => 2000.00,
                'payment_type_id' => $reservation,
                'date' => Carbon::now(),
                'payment_reason_id' => $reservationReason,
                'description' => 'Event hall booking',
                'receipt' => 'receipt_reservation_1.jpg',
                'is_paid' => 1,
                'report_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Service
            [
                'apartment_id' => 4,
                'amount' => 750.00,
                'payment_type_id' => $service,
                'date' => Carbon::now(),
                'payment_reason_id' => $serviceReason,
                'description' => 'Water bill payment',
                'receipt' => 'receipt_service_1.jpg',
                'is_paid' => 1,
                'report_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
