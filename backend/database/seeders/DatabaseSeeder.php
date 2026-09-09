<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PeopleSeeder::class,
            UsersSeeder::class,
            ApartmentsSeeder::class,
            ApartmentPersonSeeder::class,

            PaymentTypeSeeder::class,
            PaymentReasonSeeder::class,

            ReportsSeeder::class,
            PaymentSeeder::class,
            MaintenanceSeeder::class,

            CarSeeder::class,
            EventSeeder::class,
            MessageSeeder::class,

            ExpenseSeeder::class,
        ]);
    }
}