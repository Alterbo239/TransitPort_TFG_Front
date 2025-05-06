<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Administrativo;

class Buque extends Model
{
    protected $table = 'buque';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'amarre', 'procedencia', 'destino', 'id_administrativo'];

    public function administrativos()
    {
        return $this->belongsToMany(Administrativo::class);
    }
}
