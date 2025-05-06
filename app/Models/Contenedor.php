<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Zona;

class Contenedor extends Model
{
    protected $table = 'contenedor';
    protected $primaryKey = 'id';
    protected $fillable = ['estado', 'id_zona'];

    public function zonas()
    {
        return $this->belongsToMany(Zona::class);
    }
}
