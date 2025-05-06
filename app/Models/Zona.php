<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Gestor;
use App\Models\Patio;
use App\Models\Grua;

class Zona extends Model {
    protected $table = 'zona';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'ubicacion', 'X', 'Y', 'Z', 'capacidad', 'id_gestor', 'id_patio', 'id_grua'];

    public function gestor()
    {
        return $this->belongsTo(Gestor::class, 'id_gestor');
    }

    public function patio()
    {
        return $this->belongsTo(Patio::class, 'id_patio');
    }

    public function grua()
    {
        return $this->belongsTo(Grua::class, 'id_grua');
    }

}
