<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Cliente;

class Documento extends Model {
    protected $table = 'documento';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'ruta', 'fecha', 'estado', 'id_cliente'];

    public function zonas() {
        return $this->belongsTo(Cliente::class);
    }
}
