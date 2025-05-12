<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Documento;
use App\Models\Empresa;
use App\Models\Gestor;

class Cliente extends Model {
    protected $table = 'cliente';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $fillable = [ 'id', 'nombre', 'usuario', 'password', 'cargo', 'autonomo', 'estado', 'id_empresa', 'id_gestor' ];

    public function empresas() {
        return $this -> belongsTo(Empresa::class, 'id_empresa');
    }
    public function gestores() {
        return $this -> belongsTo(Gestor::class, 'id_gestor');
    }
    public function documento() {
        return $this -> hasOne(Documento::class);
    }
}
