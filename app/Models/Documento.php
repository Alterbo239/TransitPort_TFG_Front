<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Cliente;
use App\Models\Gestor;

class Documento extends Model {
    protected $table = 'documento';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'ruta', 'fecha', 'estado', 'id_cliente', 'id_gestor'];

    public function clientes() {
        return $this->belongsTo(Cliente::class);
    }

    public function gestores() {
        return $this->belongsTo(Cliente::class);
    }
}
