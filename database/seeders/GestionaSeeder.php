<?php

namespace Database\Seeders;

use App\Models\Gestiona;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GestionaSeeder extends Seeder {
    public function run(): void {
        $gestiona = [
            [
                'id_grua' => '1',
                'id_contenedor' => '1',
                'fecha' => now(),
                'hora' => '12:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_grua' => '1',
                'id_contenedor' => '3',
                'fecha' => now(),
                'hora' => '18:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($gestiona as $relacion) {
            Gestiona::create($relacion);
        }
    }
}