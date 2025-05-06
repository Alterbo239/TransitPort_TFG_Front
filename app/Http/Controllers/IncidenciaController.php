<?php

namespace App\Http\Controllers;

use App\Models\Incidencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IncidenciaController extends Controller {
    public function index(Request $request) {
        //$task = Incidencia::all();
        $task = DB::table('incidencia')
        -> join('operador', 'incidencia.id_operador', '=', 'operador.id')
        -> join('orden', 'incidencia.id_orden', '=', 'orden.id')
        -> select('incidencia.id', 'codigo_tipo', 'incidencia.tipo', 'incidencia.id_operador', 'incidencia.id_orden', 'observacion')

        -> selectSub(function ($query) {
            $query -> from('operador')
                -> select('operador.nombre')
                -> WhereColumn('operador.id', 'incidencia.id_operador')
                -> limit(1);
        }, 'id_operador')
        -> selectSub(function ($query) {
            $query -> from('orden')
                -> select('orden.tipo')
                -> WhereColumn('orden.id', 'incidencia.id_orden')
                -> limit(1);
        }, 'id_orden')
        -> get();
        return $task;
        //Esta función nos devolvera todas las tareas que tenemos en nuestra BD
    }
    public function store(Request $request) {
       $validatedData = $request->validate([
            'codigo_tipo' => 'int',
            'tipo' => 'string',
            'observacion' => 'string',
            'id_orden' => 'int',
            'id_administrativo' => 'int',
            'id_operador' => 'int',
        ]);

        try {
            // Crear y guardar la tarea con asignación masiva
            $task = Incidencia::create($validatedData);

            return response()->json([
                'message' => 'Incidencia creada con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear la incidencia.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function show(Request $request)
    {
        $task = Incidencia::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'codigo_tipo' => 'int',
            'tipo' => 'string',
            'observacion' => 'string',
            'id_orden' => 'int',
            'id_administrativo' => 'int',
            'id_operador' => 'int',
        ]);

        try {
            $task = Incidencia::findOrFail($request["id"]);
            $task->update($validatedData);

            return response()->json([
                'message' => 'Incidencia actualizada con éxito.',
                'task' => $task,
            ], 200);
            //Esta función actualizará la tarea que hayamos seleccionado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar la incidencia.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function destroy(Request $request)
    {
        $task = Incidencia::destroy($request->id);  //task tienen el id que se ha borrado

        return response()->json([
            "message" => "Incidencia con id =" . $task . " ha sido borrado con éxito"
        ], 201);
        //Esta función obtendra el id de la tarea que hayamos seleccionado y la borrará de nuestra BD
    }
}
