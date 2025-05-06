<?php

namespace App\Http\Controllers;

use App\Models\Tiene;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TieneController extends Controller {
    public function index(Request $request) {
        $task = DB::table('tiene')
        //Join (tabla, id_tabla de la Select, =, id_tabla Original).
        -> join('contenedor', 'tiene.id_contenedor', '=','contenedor.id')
        -> join('buque', 'tiene.id_buque', '=', 'buque.id')
        -> join('zona', 'contenedor.id_zona', '=','zona.id')
        -> select('id_contenedor', 'tiene.ubicacion', 'tiene.destino', 'contenedor.estado')
        //Subconsultas que pillan el nombre de la Zona y del Buque, para mostrarlo bonito.
        -> selectSub(function ($query) {
            $query -> from('zona')
                -> join('contenedor', 'contenedor.id_zona', '=', 'zona.id')
                -> whereColumn('contenedor.id', 'tiene.id_contenedor')
                -> select('zona.ubicacion')
                -> limit(1);
        }, 'ubicacion')
        -> selectSub(function ($query) {
            $query -> from('buque')
                -> select('buque.nombre')
                -> whereColumn('buque.id', 'tiene.id_buque')
                -> limit(1);
        }, 'destino')
        /**
         * Condiciones para que su trayecto sea Buque -> Zona o viceversa.
         * Ademas comprobaremos, que en el caso de la ubicacion, si el contenedor ya ha llegado.
         * Primero comprueba que el estado sea "finalizado", si es asi, entonces el destino sera la ubicacion tambien.
         */
        -> selectRaw('CASE
            WHEN contenedor.estado = "Completada" THEN
                CASE
                    WHEN tiene.tipo_destino = "Buque"
                    THEN buque.nombre
                    ELSE zona.ubicacion
                END
            WHEN tiene.tipo_destino = "Buque"
            THEN zona.ubicacion
            ELSE buque.nombre
            END AS ubicacion
        ')
        -> selectRaw('CASE
            WHEN tiene.tipo_destino = "Buque"
            THEN buque.nombre
            ELSE zona.ubicacion
            END AS destino
        ')
        -> get();
        return $task;
    }

    public function store(Request $request) {
       $validatedData = $request->validate([
            'id_buque' => 'int',
            'id_contenedor' => 'int',
            'ubicacion' => 'string',
            'destino' => 'string',
        ]);

        try {
            // Crear y guardar la tarea con asignación masiva
            $task = Tiene::create($validatedData);

            return response()->json([
                'message' => 'Relacion tiene creada con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear la relacion tiene.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function show(Request $request)
    {
        $task = Tiene::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'id_zona' => 'int',
        ]);

        try {
            $task = Tiene::findOrFail($request["id"]);
            $task->update($validatedData);

            return response()->json([
                'message' => 'Relacion tiene actualizada con éxito.',
                'task' => $task,
            ], 200);
            //Esta función actualizará la tarea que hayamos seleccionado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar la relacion tiene.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function destroy(Request $request)
    {
        $task = Tiene::destroy($request->id);  //task tienen el id que se ha borrado

        return response()->json([
            "message" => "Relacion tiene con id =" . $task . " ha sido borrado con éxito"
        ], 201);
        //Esta función obtendra el id de la tarea que hayamos seleccionado y la borrará de nuestra BD
    }
}