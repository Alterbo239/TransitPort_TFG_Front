<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Gestor;

class Administrativo extends Model
{
    protected $table = 'administrativo';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'usuario', 'password', 'cargo', 'id_gestor'];

    public function gestores()
    {
        return $this->belongsToMany(Gestor::class);
    }
}