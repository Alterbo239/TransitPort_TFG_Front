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
        Schema::create('zona', callback: function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text('ubicacion');
            $table->float('X')->default(0);
            $table->float('Y')->default(0);
            $table->float('Z')->default(0);
            $table->integer(column: 'capacidad');
            $table->foreignId('id_gestor')-> constrained('users') -> onDelete('cascade');
            $table->foreignId('id_patio')->constrained('patio');
            $table->foreignId('id_grua')->constrained('grua');
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
