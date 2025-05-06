<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('operador', function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text(column: 'usuario');
            $table->text(column: 'password');
            $table->enum('cargo', ['operador']);
            $table->string('estado');
            $table->text(column: 'tipo');
            /* $table->time(column: 'fin_horario');
            $table->time(column: 'inicio_horario'); */
            $table->foreignId('id_gestor') -> constrained('users') -> onDelete('cascade');
            $table->foreignId('id_turno') ->constrained('turno') -> onDelete('cascade');
            $table->timestamps();
          });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
