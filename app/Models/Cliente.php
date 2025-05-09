<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Documento;
use App\Models\Empresa;

class Cliente extends Model {
    protected $table = 'cliente';
    protected $primaryKey = 'id';
    protected $fillable = [ 'nombre', 'usuario', 'password', 'cargo', 'autonomo', 'estado', 'id_empresa' ];

    public function empresas() {
        return $this -> belongsTo(Empresa::class, 'id_empresa');
    }
    public function documento() {
        return $this -> hasOne(Documento::class);
    }
}
