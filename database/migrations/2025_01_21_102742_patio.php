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
        Schema::create('patio', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->text('nombre');
            $table->float('x')->default(0);
            $table->float('y')->default(0);
            $table->float('z')->default(0);
            $table->integer(column: 'capacidad');
            $table->foreignId('id_gestor')-> constrained('users') -> onDelete('cascade');
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
