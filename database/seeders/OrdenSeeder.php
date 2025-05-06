<?php

namespace Database\Seeders;

use App\Models\Orden;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrdenSeeder extends Seeder {
    public function run(): void {
        $ordenes = [
            [
                'tipo' => 'carga',
                'cantidad_contenedores' => 50,
                'fecha_inicio' => '2025-02-05',
                'fecha_fin' => '2025-02-11',
                'estado' => 'Por empezar',
                'visto' => '1',
                'id_grua' => '1',
                'id_administrativo' => '3',
                'id_operador' => '7',
                'id_buque' => '1',
                'id_zona' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tipo' => 'descarga',
                'cantidad_contenedores' => 80,
                'fecha_inicio' => '2025-02-04',
                'fecha_fin' => '2025-02-07',
                'estado' => 'En curso',
                'visto' => '0',
                'id_grua' => '1',
                'id_administrativo' => '4',
                'id_operador' => '7',
                'id_buque' => '1',
                'id_zona' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tipo' => 'carga',
                'cantidad_contenedores' => 120,
                'fecha_inicio' => '2025-02-04',
                'fecha_fin' => '2025-02-07',
                'estado' => 'En curso',
                'visto' => '0',
                'id_grua' => '1',
                'id_administrativo' => '4',
                'id_operador' => '7',
                'id_buque' => '1',
                'id_zona' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tipo' => 'descarga',
                'cantidad_contenedores' => 70,
                'fecha_inicio' => '2025-02-04',
                'fecha_fin' => '2025-02-07',
                'estado' => 'En curso',
                'visto' => '1',
                'id_grua' => '1',
                'id_administrativo' => '4',
                'id_operador' => '8',
                'id_buque' => '1',
                'id_zona' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tipo' => 'descarga',
                'cantidad_contenedores' => 60,
                'fecha_inicio' => '2025-02-04',
                'fecha_fin' => '2025-02-07',
                'estado' => 'En curso',
                'visto' => '0',
                'id_grua' => '1',
                'id_administrativo' => '4',
                'id_operador' => '8',
                'id_buque' => '1',
                'id_zona' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($ordenes as $orden) {
            Orden::create($orden);
        }
    }
}
