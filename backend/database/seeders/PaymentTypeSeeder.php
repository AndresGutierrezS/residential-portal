<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('payment_types')->insert([
            ['type' => 'Maintenance', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Fine', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Reservation', 'created_at' => now(), 'updated_at' => now()],
            ['type' => 'Service', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }   
}
