<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create(table: 'documento', callback: function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text('ruta');
            $table->date('fecha');
            $table->enum('estado', ['Activo', 'Inactivo']);
            $table->foreignId('id_cliente') -> constrained('cliente') -> onDelete('cascade');
            $table->foreignId('id_gestor') -> nullable() -> constrained('gestor');
            $table->timestamps();
        });
    }
};
