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
        Schema::create('empresa', function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text('ciudad');
            $table->text('codigo_postal');
            $table->text('cif');
            $table->text('email');
            $table->foreignId('id_gestor') -> constrained('users') -> onDelete('cascade');
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
