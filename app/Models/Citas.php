<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Administrativo;
use App\Models\Cliente;
use App\Models\Buque;
use App\Models\Zona;

class Citas extends Model {
    protected $table = 'cita';
    protected $primaryKey = 'id';
    protected $fillable = [ 'tipo', 'estado', 'fecha_pedida', 'fecha_asignada', 'hora', 'id_administrativo', 'id_cliente', 'id_buque', 'id_zona' ];

    public function administrativos()
    {
        return $this -> belongsTo(Administrativo::class, 'id_administrativo');
    }
    public function clientes() {
        return $this -> belongsTo(Cliente::class, 'id_cliente');
    }

    public function buques() {
        return $this -> belongsTo(Buque::class, 'id_buque');
    }

    public function zonas() {
        return $this -> belongsTo(Zona::class, 'id_zonas');
    }
}
