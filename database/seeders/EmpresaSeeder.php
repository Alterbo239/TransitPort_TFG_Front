<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Empresa;

class EmpresaSeeder extends Seeder {
    public function run(): void {
        $empresas = [
            [
                'nombre' => 'AlTiroSL',
                'ciudad' => 'Madrid',
                'codigo_postal' => '28001',
                'cif' => '12121212A',
                'email' => 'altiro@empresa.com',
                'id_gestor' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nombre' => 'WeonSA',
                'ciudad' => 'Barcelona',
                'codigo_postal' => '08005',
                'cif' => '12121212P',
                'email' => 'weonsl@empresa.com',
                'id_gestor' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($empresas as $empresa) {
            Empresa::create($empresa);
        }
    }
}
