<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Buque;

class Empresa extends Model {
    protected $table = 'empresa';
    protected $primaryKey = 'id';
    protected $fillable = [ 'nombre', 'ciudad', 'codigo_postal', 'cif', 'email' ];

    public function buques() {
        return $this->hasMany(Buque::class, 'id_empresa');
    }
}
