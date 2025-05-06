<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('cliente', function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text(column: 'usuario');
            $table->text(column: 'password');
            $table->enum('cargo', ['cliente']);
            $table->boolean('autonomo');
            $table->string('estado');
            $table->foreignId('id_empresa')-> constrained('empresa') -> onDelete('cascade');
            // $table->foreignId('id_gestor') -> constrained('users') -> onDelete('cascade');
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
