<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Cliente;
use App\Models\Empresa;

class EmpresaController extends Controller {
    public function getEmpresas(Request $request) {
        $user = Auth::user();
        $cliente = Cliente::findOrFail( $user -> id );

        $empresa = Empresa::findOrFail( $cliente -> id_empresa );

        return view('Client.registroVehiculoView', ['empresa' => $empresa]);
    }
}
