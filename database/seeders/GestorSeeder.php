<?php

namespace Database\Seeders;

use App\Models\Gestor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GestorSeeder extends Seeder {
    public function run(): void {
        $gestores = [
            [
                'id' => '1',
                'nombre' => 'German Palomares',
                'usuario' => 'gpalomares',
                'password' => '1111',
                'cargo' => 'Gestor',
                'estado' => 'Activo/a',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '2',
                'nombre' => 'Bartolome Mendez Zuroaga',
                'usuario' => 'bmendez',
                'password' => '2222',
                'cargo' => 'Gestor',
                'estado' => 'Inactivo/a',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($gestores as $gestor) {
            Gestor::create($gestor);
        }
    }
}
