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
        Schema::create(table: 'gestiona', callback: function (Blueprint $table) {
            $table->date(column: 'fecha');
            $table->time(column: 'hora');
            $table->foreignId('id_grua')->constrained('grua')->onDelete('cascade');
            $table->foreignId('id_contenedor')->constrained('contenedor')->onDelete('cascade');
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
