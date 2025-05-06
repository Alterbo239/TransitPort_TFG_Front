<?php

namespace App\Http\Controllers;

use App\Models\Contenedor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContenedorController extends Controller {
    public function index(Request $request) {
        $task = Contenedor::all();
        return $task;
        //Esta función nos devolvera todas las tareas que tenemos en nuestra BD.
    }

    public function store(Request $request) {
       $validatedData = $request->validate([
            'id_zona' => 'int',
        ]);

        try {
            // Crear y guardar la tarea con asignación masiva
            $task = Contenedor::create($validatedData);

            return response()->json([
                'message' => 'Contenedor creada con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el contenedor.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function show(Request $request)
    {
        $task = Contenedor::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'id_zona' => 'int',
        ]);

        try {
            $task = Contenedor::findOrFail($request["id"]);
            $task->update($validatedData);

            return response()->json([
                'message' => 'Contenedor actualizada con éxito.',
                'task' => $task,
            ], 200);
            //Esta función actualizará la tarea que hayamos seleccionado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar el contenedor.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function destroy(Request $request)
    {
        $task = Contenedor::destroy($request->id);  //task tienen el id que se ha borrado

        return response()->json([
            "message" => "Contenedor con id =" . $task . " ha sido borrado con éxito"
        ], 201);
        //Esta función obtendra el id de la tarea que hayamos seleccionado y la borrará de nuestra BD
    }
}