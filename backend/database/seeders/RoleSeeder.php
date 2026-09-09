<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            [
                'role' => 'owner',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role' => 'tenant',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role' => 'resident',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role' => 'visitor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}