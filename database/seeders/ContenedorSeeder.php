<?php

namespace Database\Seeders;

use App\Models\Contenedor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContenedorSeeder extends Seeder {
    public function run(): void
    {
        $contenedores = [
            [
                'estado' => 'Por empezar',
                'id_zona' => '1',
                'parcela' => '4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'estado' => 'Por empezar',
                'id_zona' => '3',
                'parcela' => '7',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'estado' => 'En curso',
                'id_zona' => '2',
                'parcela' => '12',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'estado' => 'En curso',
                'id_zona' => '1',
                'parcela' => '400',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'estado' => 'Completada',
                'id_zona' => '1',
                'parcela' => '167',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($contenedores as $contenedor) {
            Contenedor::create($contenedor);
        }
    }
}
