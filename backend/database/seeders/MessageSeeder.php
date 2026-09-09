<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageSeeder extends Seeder
{
    public function run(): void
    {
        $admin = DB::table('people')
            ->where('name', 'Carlos')
            ->where('last_name', 'Ramírez')
            ->value('id');

        $resident = DB::table('people')
            ->where('name', 'Andrés')
            ->where('last_name', 'Gutiérrez')
            ->value('id');

        $c203 = DB::table('apartments')
            ->where('code', 'C-203')
            ->value('id');

        DB::table('messages')->insert([
            [
                'sender_id' => $admin,
                'receiver_id' => $resident,
                'apartment_from_id' => null,
                'apartment_to_id' => $c203,
                'message' => 'Hola, ¿en qué podemos ayudarte?',
                'sent_at' => now()->subHours(2),
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ],
            [
                'sender_id' => $resident,
                'receiver_id' => $admin,
                'apartment_from_id' => $c203,
                'apartment_to_id' => null,
                'message' => 'Hola, quería consultar sobre el próximo mantenimiento.',
                'sent_at' => now()->subHour(),
                'created_at' => now()->subHour(),
                'updated_at' => now()->subHour(),
            ],
        ]);
    }
}