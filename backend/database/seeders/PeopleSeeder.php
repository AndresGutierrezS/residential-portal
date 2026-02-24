<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PeopleSeeder extends Seeder
{
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            DB::table('people')->insert([
                'name' => fake()->firstName(),
                'last_name' => fake()->lastName(),
                'second_last_name' => fake()->lastName(),
                'phone' => fake()->phoneNumber(),
                'is_active' => fake()->boolean(80), // 80% activo
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}