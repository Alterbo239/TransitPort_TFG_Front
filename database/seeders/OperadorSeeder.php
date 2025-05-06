<?php

namespace Database\Seeders;

use App\Models\Operador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OperadorSeeder extends Seeder {
    public function run(): void {
        $operadores = [
            [
                'id' => '5',
                'nombre' => 'Juan Sanchez',
                'usuario' => 'jsanchez',
                'password' => '1000',
                'cargo' => 'operador',
                'estado' => 'Inactivo/a',
                'tipo' => 'SC',
                'fin_horario' => '10:00',
                'inicio_horario' => '18:00',
                'id_gestor' => '1',
                'id_users' => '7',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '6',
                'nombre' => 'Alberto Navarro',
                'usuario' => 'anavarro',
                'password' => '2000',
                'cargo' => 'operador',
                'estado' => 'Inactivo/a',
                'tipo' => 'STS',
                'fin_horario' => '10:00',
                'inicio_horario' => '18:00',
                'id_gestor' => '2',
                'id_users' => '8',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '7',
                'nombre' => 'Jordi Martínez',
                'usuario' => 'jmartinez',
                'password' => '2200',
                'cargo' => 'operador',
                'estado' => 'Activo/a',
                'tipo' => 'SC',
                'fin_horario' => '12:00',
                'inicio_horario' => '20:00',
                'id_gestor' => '1',
                'id_users' => '9',
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ];

        foreach ($operadores as $operadore) {
            Operador::create($operadore);
        }
    }
}
