<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Cliente;

class ClienteSeeder extends Seeder {
    public function run(): void {
        $clientes = User::where('cargo', 'cliente') -> get();

        foreach ($clientes as $cliente) {
            $autonomo = [ false, true ];
            $random = rand(0, 1);

            Cliente::create([
                'id' => $cliente['id'],
                'nombre' => $cliente['name'],
                'usuario' => $cliente['usuario'],
                'password' => $cliente['password'],
                'cargo' => $cliente['cargo'],
                'autonomo' => $autonomo[$random],
                'estado' => $cliente['estado'],
                'id_gestor' => 1,
                'id_empresa' => $random + 1,
            ]);
        }
    }
}
