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
                'id_cliente' => '10',
                'id_empresa' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Titanic',
                'tipo' => 'buque',
                'id_cliente' => '10',
                'id_empresa' => '1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Poseidón',
                'tipo' => 'buque',
                'id_cliente' => '11',
                'id_empresa' => '2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'Ocean Spirit',
                'tipo' => 'trailer',
                'id_cliente' => '10',
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
