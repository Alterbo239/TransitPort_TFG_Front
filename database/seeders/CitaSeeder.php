<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Citas;

class CitaSeeder extends Seeder {
    public function run(): void {
        $citas = [
            [
                'tipo' => 'carga',
                'estado' => 'Completada',
                'fecha_pedida' => now() -> format('Y-m-d'),
                'fecha_asignada' => now() -> addDays(3) -> format('Y-m-d'),
                'hora' => now() -> format('H:i'),
                'id_administrativo' => '6',
                'id_cliente' => '10',
                'id_buque' => '1',
                'id_zona' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tipo' => 'carga',
                'estado' => 'En revision',
                'fecha_pedida' => now() -> format('Y-m-d'),
                'fecha_asignada' => null,
                'hora' => null,
                'id_administrativo' => null,
                'id_cliente' => '10',
                'id_buque' => '1',
                'id_zona' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($citas as $cita) {
            Citas::create($cita);
        }
    }
}
