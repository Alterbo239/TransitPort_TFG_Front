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
        Schema::create(table: 'pertenece', callback: function (Blueprint $table) {
            $table->date('fecha');
            $table->time('hora');
            $table->foreignId('id_grua')->constrained('grua')->onDelete('cascade');
            $table->foreignId('id_zona')->constrained('zona')->onDelete('cascade');
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
