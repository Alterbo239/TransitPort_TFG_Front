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
        Schema::create('gestor', function (Blueprint $table) {
            $table->id();
            $table->text('nombre');
            $table->text(column: 'usuario');
            $table->text(column: 'password');
            $table->enum('cargo', ['gestor']);
            $table->string('estado');
            $table -> foreign('id') -> references('id') -> on('users');
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
