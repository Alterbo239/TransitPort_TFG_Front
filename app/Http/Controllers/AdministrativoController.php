<?php

namespace App\Http\Controllers;

use App\Models\Administrativo;
use Illuminate\Http\Request;

class AdministrativoController extends Controller {
    public function index(Request $request) {
        $task = Administrativo::all();
        return $task;
        //Esta función nos devolvera todas las tareas que tenemos en nuestra BD
    }
}