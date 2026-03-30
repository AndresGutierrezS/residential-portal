<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApartmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('apartments')->insert([
            [
                'name' => 'Departamento A-101',
                'code' => 'A-101',
                'is_overdue' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Departamento A-102',
                'code' => 'A-102',
                'is_overdue' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Departamento A-201',
                'code' => 'A-201',
                'is_overdue' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Departamento B-101',
                'code' => 'B-101',
                'is_overdue' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Departamento B-202',
                'code' => 'B-202',
                'is_overdue' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Departamento C-101',
                'code' => 'C-101',
                'is_overdue' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Departamento C-203',
                'code' => 'C-203',
                'is_overdue' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
