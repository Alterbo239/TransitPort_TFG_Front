<?php

namespace Database\Seeders;

use App\Models\Tiene;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TieneSeeder extends Seeder {
    public function run(): void
    {
        $tiene = [
            [
                'id_buque' => '1',
                'id_contenedor' => '1',
                'ubicacion' => '1',
                'destino' => '1',
                'tipo_destino' => 'Zona',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_buque' => '2',
                'id_contenedor' => '3',
                'ubicacion' => '1',
                'destino' => '2',
                'tipo_destino' => 'Buque',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_buque' => '3',
                'id_contenedor' => '5',
                'ubicacion' => '1',
                'destino' => '2',
                'tipo_destino' => 'Buque',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_buque' => '4',
                'id_contenedor' => '4',
                'ubicacion' => '1',
                'destino' => '2',
                'tipo_destino' => 'Zona',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($tiene as $relacion) {
            Tiene::create($relacion);
        }
    }
}
