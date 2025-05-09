<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Cliente;
use App\Models\Empresa;

class Buque extends Model
{
    protected $table = 'buque';
    protected $primaryKey = 'id';
    protected $fillable = [ 'nombre', 'tipo', 'id_cliente', 'id_empresa' ];

    public function clientes() {
        return $this->belongsTo(Cliente::class);
    }
    public function empresas() {
        return $this->belongsTo(Empresa::class);
    }
}
