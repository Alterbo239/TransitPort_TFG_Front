<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Gestor;
use App\Models\Turno;

class Operador extends Model
{
    protected $table = 'operador';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'usuario', 'password', 'cargo', 'estado', 'tipo', 'id_gestor', 'id_turno'];

    public function gestores()
    {
        return $this->belongsToMany(Gestor::class);
    }
    public function turnos()
    {
        return $this->belongsToMany(Turno::class);
    }
}
