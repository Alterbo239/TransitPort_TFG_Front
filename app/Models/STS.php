<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Grua;

class STS extends Model {
    protected $table = 'STS';
    protected $primaryKey = 'id_grua';
    protected $fillable = ['nombre', 'modelo', 'marca', 'estado', 'tipo', 'capacidad_carga', 'id_gestor'];

    public function gruas() {
        return $this->belongsToMany(Grua::class);
    }
}
