<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\SC;
use App\Models\Zona;

class Pertenece extends Model {    
    protected $table = 'pertenece';
    protected $fillable = ['id_grua', 'id_zona', 'fecha', 'hora'];

    public function pertenece() {
        return $this->belongsToMany(SC::class, Zona::class);
    }
}