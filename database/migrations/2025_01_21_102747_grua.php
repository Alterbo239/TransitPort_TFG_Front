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
        Schema::create('grua', callback: function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text('modelo');
            $table->text('marca');
            $table->text('estado');
            $table->enum('tipo', ['SC', 'STS']);
            $table->float(column: 'capacidad_carga');
            $table->foreignId('id_gestor')->onDelete('cascade');
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
