<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        $payments = DB::table('payments')
            ->whereIn('description', [
                'Monthly maintenance April',
                'Monthly maintenance May',
            ])
            ->get();

        foreach ($payments as $payment) {
            $month = $payment->description === 'Monthly maintenance April'
                ? 4
                : 5;

            DB::table('maintenances')->insert([
                'month' => $month,
                'year' => 2026,
                'is_completed' => (bool) $payment->is_paid,
                'amount' => $payment->amount,
                'payment_id' => $payment->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}