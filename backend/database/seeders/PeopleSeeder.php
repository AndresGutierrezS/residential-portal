<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PeopleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('people')->insert([
            [
                'name' => 'Carlos',
                'last_name' => 'Ramírez',
                'second_last_name' => 'López',
                'phone' => '3312345678',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Andrés',
                'last_name' => 'Gutiérrez',
                'second_last_name' => 'Sánchez',
                'phone' => '3312345679',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mariana',
                'last_name' => 'Torres',
                'second_last_name' => 'Hernández',
                'phone' => '3312345680',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Daniel',
                'last_name' => 'Martínez',
                'second_last_name' => 'Gómez',
                'phone' => '3312345681',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sofía',
                'last_name' => 'Navarro',
                'second_last_name' => 'Ruiz',
                'phone' => '3312345682',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Luis',
                'last_name' => 'Morales',
                'second_last_name' => 'Castillo',
                'phone' => '3312345683',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}