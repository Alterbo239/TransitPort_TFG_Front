<?php

namespace Database\Seeders;

use App\Models\Utiliza;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UtilizaSeeder extends Seeder {
    public function run(): void {
        $utiliza = [
            [
                'id_grua' => '1',
                'id_operador' => '9',
                'hora_inicio' => '12:00',
                'hora_fin' => '14:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_grua' => '2',
                'id_operador' => '8',
                'hora_inicio' => '12:00',
                'hora_fin' => '14:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($utiliza as $relacion) {
            Utiliza::create($relacion);
        }
    }
}