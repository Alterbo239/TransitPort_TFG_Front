<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Cliente;
use App\Models\Empresa;

class EmpresaController extends Controller {
    public function getEmpresas(Request $request) {
        $empresas = Empresa::all() -> keyBy('id');

        return view('Administrativo.crearTransporte', ['empresas' => $empresas]);
    }

    public function store(Request $request) {
        $empresa = $request -> validate([
            'nombre' => 'string',
            'ciudad' => 'string',
            'cif' => 'string',
            'email' => 'string',
            'codigo_postal' => 'string',
        ]);

        $empresa['id_gestor'] = Auth::user() -> id;

        try {
            Empresa::create($empresa);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la empresa.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return redirect() -> route('exito') -> with([
            'cabecera' => "Crear empresa",
            'mensaje' => "Empresa creada con éxito!"
        ]);
    }
}
