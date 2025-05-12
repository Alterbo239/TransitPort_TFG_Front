<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Buque;
use App\Models\Gestor;

class Empresa extends Model {
    protected $table = 'empresa';
    protected $primaryKey = 'id';
    protected $fillable = [ 'nombre', 'ciudad', 'codigo_postal', 'cif', 'email', 'id_gestor' ];

    public function buques() {
        return $this->hasMany(Buque::class, 'id_empresa');
    }
    public function gestores() {
        return $this -> belongsTo(Gestor::class, 'id_gestor');
    }
}
