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
        Schema::create(table: 'buque', callback: function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->integer('amarre');
            $table->text(column: 'procedencia');
            $table->text(column: 'destino');
            $table->foreignId('id_administrativo')-> constrained('users') -> onDelete('cascade');
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
