<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Carbon\Carbon;

class ReportsSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener usuarios existentes
        $users = User::all();

        // Validación básica para evitar error de FK
        if ($users->isEmpty()) {
            $this->command->warn('No users found. Please seed users first.');
            return;
        }

        DB::table('reports')->insert([
            [
                'user_id' => $users->random()->id,
                'content' => 'Monthly report for building maintenance',
                'date' => Carbon::now()->subDays(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $users->random()->id,
                'content' => 'Incident report: noise complaint',
                'date' => Carbon::now()->subDays(5),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $users->random()->id,
                'content' => 'Reservation usage report',
                'date' => Carbon::now(),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}