<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Grua;
use App\Models\Operador;

class Utiliza extends Model {
    protected $table = 'utiliza';
    protected $fillable = ['id_grua', 'id_operador', 'hora_inicio', 'hora_fin'];

    public function utiliza() {
        return $this->belongsToMany(Grua::class, Operador::class);
    }
}