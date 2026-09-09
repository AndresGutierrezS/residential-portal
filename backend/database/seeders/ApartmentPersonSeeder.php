<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApartmentPersonSeeder extends Seeder
{
    public function run(): void
    {
        $residentRole = DB::table('roles')
            ->where('role', 'resident')
            ->value('id');

        $ownerRole = DB::table('roles')
            ->where('role', 'owner')
            ->value('id');

        $adminRole = DB::table('roles')
            ->where('role', 'admin')
            ->value('id');

        $andres = DB::table('people')
            ->where('name', 'Andrés')
            ->where('last_name', 'Gutiérrez')
            ->value('id');

        $mariana = DB::table('people')
            ->where('name', 'Mariana')
            ->value('id');

        $daniel = DB::table('people')
            ->where('name', 'Daniel')
            ->value('id');

        $carlos = DB::table('people')
            ->where('name', 'Carlos')
            ->value('id');

        $a101 = DB::table('apartments')
            ->where('code', 'A-101')
            ->value('id');

        $a102 = DB::table('apartments')
            ->where('code', 'A-102')
            ->value('id');

        $b101 = DB::table('apartments')
            ->where('code', 'B-101')
            ->value('id');

        $c203 = DB::table('apartments')
            ->where('code', 'C-203')
            ->value('id');

        DB::table('apartment_person')->insert([
            [
                'person_id' => $andres,
                'apartment_id' => $c203,
                'role_id' => $residentRole,
                'is_resident' => true,
                'code' => 'C-203',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'person_id' => $mariana,
                'apartment_id' => $a101,
                'role_id' => $residentRole,
                'is_resident' => true,
                'code' => 'A-101',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'person_id' => $daniel,
                'apartment_id' => $a102,
                'role_id' => $ownerRole,
                'is_resident' => true,
                'code' => 'A-102',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'person_id' => $carlos,
                'apartment_id' => $b101,
                'role_id' => $adminRole,
                'is_resident' => false,
                'code' => 'B-101',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}