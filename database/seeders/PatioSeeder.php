<?php

namespace Database\Seeders;

use App\Models\Patio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PatioSeeder extends Seeder {
    public function run(): void {
        $patios = [
            [
            'x' => 50,
            'y' => 50,
            'z' => 1,
            'capacidad' => 16000,
            'id_gestor' => 1,
            'nombre' => 'Patio Central',
            'created_at' => now(),
            'updated_at' => now(),
            ]
        ];

        foreach ($patios as $patio) {
            Patio::create($patio);
        }
    }
}
