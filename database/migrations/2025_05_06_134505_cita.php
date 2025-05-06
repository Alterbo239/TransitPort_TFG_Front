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
        Schema::create(table: 'cita', callback: function (Blueprint $table) {
            $table->id();
            $table->text(column: 'tipo');
            $table->date('fecha_pedida');
            $table->date('fecha_asignada') -> nullable();
            $table->time('hora') -> nullable();
            $table->enum('estado', ['En revision', 'Completada']);
            $table->foreignId('id_administrativo') ->nullable() -> constrained('users') -> onDelete('cascade');
            $table->foreignId('id_cliente')->constrained('cliente')->onDelete('cascade');
            $table->foreignId('id_buque')->constrained('buque')->onDelete('cascade');
            $table->foreignId('id_zona')->nullable()->constrained('zona')->onDelete('cascade');
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
