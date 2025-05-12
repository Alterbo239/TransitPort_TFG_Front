<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Administrativo;
use App\Models\Empresa;

class Buque extends Model
{
    protected $table = 'buque';
    protected $primaryKey = 'id';
    protected $fillable = [ 'nombre', 'tipo', 'id_administrativo', 'id_empresa' ];

    public function administrativos() {
        return $this->belongsTo(Administrativo::class);
    }
    public function empresas() {
        return $this->belongsTo(Empresa::class);
    }
}
