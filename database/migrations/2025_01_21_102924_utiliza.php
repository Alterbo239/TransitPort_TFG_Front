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
        Schema::create(table: 'utiliza', callback: function (Blueprint $table) {
            $table->time(column: 'hora_inicio');
            $table->time(column: 'hora_fin');
            $table->foreignId('id_grua')->constrained('grua')->onDelete('cascade');
            $table->foreignId('id_operador')->constrained('operador')->onDelete('cascade');
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
