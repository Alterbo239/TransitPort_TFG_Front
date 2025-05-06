<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\OrdenSeeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $this -> call([
            TurnoSeeder::class,
            UsuarioSeeder::class,
            //GestorSeeder::class,
            //AdministrativoSeeder::class,
            //OperadorSeeder::class,
            GruaSeeder::class,
            UtilizaSeeder::class,
            PatioSeeder::class,
            ZonaSeeder::class,
            PerteneceSeeder::class,
            BuqueSeeder::class,
            ContenedorSeeder::class,
            GestionaSeeder::class,
            TieneSeeder::class,
            OrdenSeeder::class,
            IncidenciaSeeder::class,
        ]);
    }    
}