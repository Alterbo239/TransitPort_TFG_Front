<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Buque;
use App\Models\Contenedor;

class Tiene extends Model
{
    protected $table = 'tiene';
    protected $fillable = ['id_buque', 'id_contenedor', 'ubicacion', 'destino', 'tipo_dstino'];

    public function tiene()
    {
        return $this->belongsToMany(Buque::class, Contenedor::class);
    }
}
