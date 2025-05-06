<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gestor extends Model
{
    protected $table = 'gestor';
    protected $primaryKey = 'id';
    protected $fillable = ['nombre', 'usuario', 'password'];
    public $timestamps = false;
}
