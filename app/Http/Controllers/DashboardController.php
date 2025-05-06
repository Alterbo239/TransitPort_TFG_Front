<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function perfil(){

        return view('vistaPerfil');

    }

    public function ordenes(){

        return view('/Operador/principal');

    }

    public function notificaciones(){

        return view('vistaNotificaciones');

    }
}
