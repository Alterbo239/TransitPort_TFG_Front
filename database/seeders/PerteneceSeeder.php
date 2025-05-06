<?php

namespace Database\Seeders;

use App\Models\Pertenece;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PerteneceSeeder extends Seeder {
    public function run(): void {
        $pertenece = [
            [
                'id_grua' => '1',
                'id_zona' => '1',
                'fecha' => now(),
                'hora' => '12:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_grua' => '1',
                'id_zona' => '2',
                'fecha' => now(),
                'hora' => '14:00',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($pertenece as $relacion) {
            Pertenece::create($relacion);
        }
    }
}