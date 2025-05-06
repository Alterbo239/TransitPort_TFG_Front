<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Orden;
use App\Models\Operador;

class Turno extends Model {      
    protected $table = 'turno';
    protected $primaryKey = 'id';
    protected $fillable = ['fecha_inicio', 'fecha_fin'];
}