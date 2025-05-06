<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Orden;
use App\Models\Administrativo;
use App\Models\Operador;

class Incidencia extends Model {
    protected $table = 'incidencia';
    protected $primaryKey = 'id';
    protected $fillable = ['codigo_tipo', 'tipo', 'observacion', 'id_orden', 'id_administrativo', 'id_operador'];

    public function ordenes() {
        return $this->belongsToMany(Orden::class);
    }
    public function administrativos() {
        return $this->belongsToMany(Administrativo::class);
    }
    public function operadores() {
        return $this->belongsToMany(Operador::class);
    }
}
