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
        Schema::create(table: 'contenedor', callback: function (Blueprint $table) {
            $table->id();
            $table->integer('parcela');
            $table->enum('estado', ['Por empezar', 'En curso', 'Completada']);
            $table->foreignId('id_zona')->constrained('zona');
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
