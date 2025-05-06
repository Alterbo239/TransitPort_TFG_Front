<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Administrativo;
use App\Models\Operador;
use App\Models\Buque;
use App\Models\Zona;
use App\Models\Grua;

class Orden extends Model
{
    protected $table = 'orden';
    protected $primaryKey = 'id';
    protected $fillable = ['tipo', 'cantidad_contenedores', 'fecha_inicio', 'fecha_fin', 'id_administrativo','visto', 'id_operador', 'id_buque', 'id_zona', 'id_grua'];

    public function administrativos()
    {
        return $this->belongsToMany(Administrativo::class);
    }
    public function operador()
    {
        return $this->belongsToMany(Operador::class);
    }
    public function buques()
    {
        return $this->belongsToMany(Buque::class);
    }
    public function zonas()
    {
        return $this->belongsToMany(zona::class);
    }
    public function gruas()
    {
        return $this->belongsToMany(Grua::class);
    }

    public function buque()
    {
        return $this->belongsTo(Buque::class, 'id_buque', 'id');
    }
    public function tiene()
    {
        return $this->belongsTo(Tiene::class, 'id_buque', 'id_buque');
    }
    public function contenedor()
    {
        return $this->belongsTo(Contenedor::class, 'id_contenedor', 'id');
    }
    public function zona()
    {
        return $this->belongsTo(Zona::class, 'id_zona', 'id');
    }
    public function administrativo()
    {
        return $this->belongsTo(Administrativo::class, 'id_administrativo');
    }
}
