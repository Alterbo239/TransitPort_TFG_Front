<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Cliente;
use App\Models\Empresa;

class EmpresaController extends Controller {
    public function getEmpresas() {
        $empresas = Empresa::all() -> keyBy('id');

        return view('Administrativo.crearTransporte', ['empresas' => $empresas]);
    }

    public function index() {
        $empresas = Empresa::all();
        return $empresas;
    }
    public function getCiudades() {
        $empresas = Empresa::distinct() -> pluck('ciudad');
        return $empresas;
    }

    public function store(Request $request) {
        $empresa = $request -> validate([
            'nombre' => 'string',
            'ciudad' => 'string',
            'cif' => 'regex:/^[0-9]{8}[A-Za-z]$/',
            'email' => 'string',
            'codigo_postal' => 'regex:/^\d{5}$/',
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

    public function show(Request $request) {
        $empresas = Empresa::findOrFail($request -> id);
        return $empresas;
    }

    public function update(Request $request) {
        $validatedData = $request->validate([
            'id' => 'int',
            'nombre' => 'string',
            'ciudad' => 'string',
            'codigo_postal' => 'string',
            'cif' => 'string',
            'email' => 'string',
            'id_gestor' => 'int',
        ]);

        try {
            $task = Empresa::findOrFail($validatedData["id"]);

            // Usar fill() en lugar de update() para mayor control
            $task->fill($validatedData);

        if ($task->isDirty()) { // Verifica si hay cambios antes de guardar
            $task->save();
        }

            return response()->json([
                'message' => 'Cita actualizada con éxito en la base de datos.',
                'task' => $validatedData,
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar la cita.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }
}
