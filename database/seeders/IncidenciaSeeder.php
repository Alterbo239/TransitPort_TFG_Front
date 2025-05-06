<?php

namespace Database\Seeders;

use App\Models\Incidencia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IncidenciaSeeder extends Seeder {
    public function run(): void {
        $incidencias = [
            [
                'codigo_tipo' => '3',
                'tipo' => 'Grua',
                'observacion' => 'Gancho de la grua SC 2 averiado.',
                'id_orden' => '1',
                'id_administrativo' => '4',
                'id_operador' => '7',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'codigo_tipo' => '5',
                'tipo' => 'Contenedor',
                'observacion' => 'Contenedor volcado en la zona 2.',
                'id_orden' => '2',
                'id_administrativo' => '4',
                'id_operador' => '7',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        foreach ($incidencias as $incidencia) {
            Incidencia::create($incidencia);
        }
    }
}