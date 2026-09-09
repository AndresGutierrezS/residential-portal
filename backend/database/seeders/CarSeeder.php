<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $c203 = DB::table('apartments')
            ->where('code', 'C-203')
            ->value('id');

        $a101 = DB::table('apartments')
            ->where('code', 'A-101')
            ->value('id');

        $a102 = DB::table('apartments')
            ->where('code', 'A-102')
            ->value('id');

        DB::table('cars')->insert([
            [
                'apartment_id' => $c203,
                'plate' => 'JAL-203-A',
                'brand' => 'Toyota',
                'model' => 'Corolla',
                'color' => 'Blanco',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'apartment_id' => $a101,
                'plate' => 'JAL-101-B',
                'brand' => 'Mazda',
                'model' => '3',
                'color' => 'Gris',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'apartment_id' => $a102,
                'plate' => 'JAL-102-C',
                'brand' => 'Honda',
                'model' => 'Civic',
                'color' => 'Negro',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}