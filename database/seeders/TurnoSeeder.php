<?php

namespace Database\Seeders;

use App\Models\Turno;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TurnoSeeder extends Seeder {
    public function run(): void {
        $turnos = [
            [
                'fecha_inicio' => now(),
                'fecha_fin' => now() -> addHours(9),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'fecha_inicio' => now() -> addHours(8),
                'fecha_fin' => now() -> addHours(16),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
    
        foreach ($turnos as $turno) {
            Turno::create($turno);
        }
    }
}
