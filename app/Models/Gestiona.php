<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Grua;
use App\Models\Contenedor;

class Gestiona extends Model {    
    protected $table = 'gestiona';
    protected $fillable = ['id_grua', 'id_contenedor', 'fecha', 'hora'];

    public function pertenece() {
        return $this->belongsToMany(Grua::class, Contenedor::class);
    }
}