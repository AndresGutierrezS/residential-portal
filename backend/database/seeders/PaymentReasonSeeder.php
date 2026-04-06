<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentReasonSeeder extends Seeder
{
    public function run(): void
    {
        $maintenance = DB::table('payment_types')->where('type', 'Maintenance')->value('id');
        $fine = DB::table('payment_types')->where('type', 'Fine')->value('id');
        $reservation = DB::table('payment_types')->where('type', 'Reservation')->value('id');
        $service = DB::table('payment_types')->where('type', 'Service')->value('id');

        DB::table('payment_reasons')->insert([
            // Maintenance
            ['reason' => 'Monthly fee', 'payment_type_id' => $maintenance, 'created_at' => now(), 'updated_at' => now()],
            ['reason' => 'Extraordinary fee', 'payment_type_id' => $maintenance, 'created_at' => now(), 'updated_at' => now()],

            // Fine
            ['reason' => 'Noise', 'payment_type_id' => $fine, 'created_at' => now(), 'updated_at' => now()],
            ['reason' => 'Parking violation', 'payment_type_id' => $fine, 'created_at' => now(), 'updated_at' => now()],

            // Reservation
            ['reason' => 'Event hall reservation', 'payment_type_id' => $reservation, 'created_at' => now(), 'updated_at' => now()],
            ['reason' => 'Common area reservation', 'payment_type_id' => $reservation, 'created_at' => now(), 'updated_at' => now()],

            // Service
            ['reason' => 'Water bill', 'payment_type_id' => $service, 'created_at' => now(), 'updated_at' => now()],
            ['reason' => 'Electricity bill', 'payment_type_id' => $service, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}