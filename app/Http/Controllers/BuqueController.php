<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Buque;

class BuqueController extends Controller {
    public function show(Request $request) {
        $task = Buque::findOrFail($request->id);
        return $task;
    }

    public function storeVehiculo(Request $request) {
        $vehicle = $request->validate([
            'nombre' => 'string',
            'tipo' => 'string',
            'empresa' => 'string',
            'id_empresa' => 'int',
        ]);

        try {
            $cliente = Auth::user();

            $tipo = strtolower($vehicle['tipo']);

            // Crear y guardar la peticion de cita.
            $buque = Buque::create([
                "id" => null,
                "nombre" => $vehicle['nombre'],
                "tipo" => $tipo,
                "id_cliente" => $cliente -> id,
                "id_empresa" => $vehicle['id_empresa'],
            ]);

            return redirect() -> route('exitoCliente') -> with([
                'cabecera' => "Registrar vahiculo",
                'mensaje' => "¡Vehiculo " . $vehicle['nombre'] . " creado con exito!"
            ]);

            return response()->json([
                'message' => 'Vehiculo creado con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el Vehiculo.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
