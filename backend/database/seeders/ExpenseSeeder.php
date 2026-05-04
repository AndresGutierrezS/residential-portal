<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('expenses')->insert([
            [
                'amount' => 250.00,
                'description' => 'Compra de papelería para oficina',
                'date' => '2026-05-01',
                'category' => 'Oficina',
                'supplier' => 'Office Depot',
                'metod' => 'Tarjeta',
                'state' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'amount' => 1200.50,
                'description' => 'Pago de servicio de internet',
                'date' => '2026-05-02',
                'category' => 'Servicios',
                'supplier' => 'Telmex',
                'metod' => 'Transferencia',
                'state' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'amount' => 890.00,
                'description' => 'Compra de insumos de limpieza',
                'date' => '2026-05-03',
                'category' => 'Limpieza',
                'supplier' => 'Costco',
                'metod' => 'Efectivo',
                'state' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'amount' => 3500.00,
                'description' => 'Pago de renta de oficina',
                'date' => '2026-05-04',
                'category' => 'Renta',
                'supplier' => 'Inmobiliaria Centro',
                'metod' => 'Transferencia',
                'state' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'amount' => 450.75,
                'description' => 'Compra de café y snacks',
                'date' => '2026-05-05',
                'category' => 'Alimentos',
                'supplier' => 'Sam\'s Club',
                'metod' => 'Tarjeta',
                'state' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
