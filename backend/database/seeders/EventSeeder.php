<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('events')->insert([
            [
                'title' => 'Asamblea de Residentes',
                'description' => 'Reunión general para revisar asuntos de la comunidad y próximos proyectos.',
                'location' => 'Salón de usos múltiples',
                'type' => 'Meeting',
                'max_attendees' => 50,
                'event_date' => '2026-09-15 18:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Jornada de Limpieza',
                'description' => 'Actividad comunitaria para mantener en buenas condiciones las áreas comunes.',
                'location' => 'Área común',
                'type' => 'Community',
                'max_attendees' => 30,
                'event_date' => '2026-09-20 09:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Reunión de Seguridad',
                'description' => 'Revisión de medidas de seguridad y acceso al residencial.',
                'location' => 'Sala administrativa',
                'type' => 'Security',
                'max_attendees' => 20,
                'event_date' => '2026-08-10 18:00:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}