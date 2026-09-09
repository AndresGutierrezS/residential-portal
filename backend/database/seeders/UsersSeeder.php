<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $admin = DB::table('people')
            ->where('name', 'Carlos')
            ->where('last_name', 'Ramírez')
            ->first();

        $resident = DB::table('people')
            ->where('name', 'Andrés')
            ->where('last_name', 'Gutiérrez')
            ->first();

        $resident2 = DB::table('people')
            ->where('name', 'Mariana')
            ->where('last_name', 'Torres')
            ->first();

        $resident3 = DB::table('people')
            ->where('name', 'Daniel')
            ->where('last_name', 'Martínez')
            ->first();

        DB::table('users')->insert([
            [
                'person_id' => $admin->id,
                'email' => 'admin@portalgate.com',
                'password' => Hash::make('password'),
                'remember_token' => null,
                'is_admin' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'person_id' => $resident->id,
                'email' => 'resident@portalgate.com',
                'password' => Hash::make('password'),
                'remember_token' => null,
                'is_admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'person_id' => $resident2->id,
                'email' => 'mariana@portalgate.com',
                'password' => Hash::make('password'),
                'remember_token' => null,
                'is_admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'person_id' => $resident3->id,
                'email' => 'daniel@portalgate.com',
                'password' => Hash::make('password'),
                'remember_token' => null,
                'is_admin' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}