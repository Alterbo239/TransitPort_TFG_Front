<?php

namespace Database\Seeders;

use App\Models\Buque;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BuqueSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $buques = [
            [
                'nombre' => 'Santa Maria',
                'tipo' => 'buque',
                'amarre' => '2',
                'procedencia' => 'Italia',
                'destino' => 'Valencia',
                'id_administrativo' => '3',
                'id_empresa' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Titanic',
                'tipo' => 'buque',
                'amarre' => '1',
                'procedencia' => 'Barcelona',
                'destino' => 'Valencia',
                'id_administrativo' => '3',
                'id_empresa' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Poseidón',
                'tipo' => 'buque',
                'amarre' => '5',
                'procedencia' => 'Grecia',
                'destino' => 'Barcelona',
                'id_administrativo' => '3',
                'id_empresa' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Ocean Spirit',
                'tipo' => 'camion',
                'amarre' => '8',
                'procedencia' => 'Noruega',
                'destino' => 'Lisboa',
                'id_administrativo' => '3',
                'id_empresa' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($buques as $buque) {
            Buque::create($buque);
        }
    }
}
