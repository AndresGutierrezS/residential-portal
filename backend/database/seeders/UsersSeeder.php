<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    public function run()
    {
        $peopleIds = DB::table('people')->pluck('id');

        foreach ($peopleIds as $personId) {
            DB::table('users')->insert([
                'person_id' => $personId,
                'email' => fake()->email(),
                'password' => Hash::make('123'), 
                'remember_token' => Str::random(10),
                'is_admin' => fake()->boolean(30), 
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}