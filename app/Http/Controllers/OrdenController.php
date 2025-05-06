<?php

namespace App\Http\Controllers;

use App\Models\Buque;
use App\Models\Operador;
use App\Models\Orden;
use App\Models\Tiene;
use App\Models\Turno;
use App\Models\User;
use App\Models\Zona;
use Illuminate\Database\Schema\ColumnDefinition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Pail\ValueObjects\Origin\Console;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Facades\DataTables;
use Illuminate\Support\Facades\Auth;

class OrdenController extends Controller {
    public function index(Request $request) {
        $task = Orden::all();
        return $task;
        //Esta función nos devolvera todas las tareas que tenemos en nuestra BD
    }

    public function store(Request $request) {
       $validatedData = $request->validate([
            'tipo' => 'string',
            'cantidad_contenedores' => 'int',
            'visto'=> 'boolean',
            'fecha_carga' => 'date',
            'fecha_descarga' => 'date',
            'id_grua' => 'int',
            'id_administrativo' => 'int',
            'id_buque' => 'int',
            'id_contenedor' => 'int',
            'id_zona' => 'int',
        ]);

        try {
            // Crear y guardar la tarea con asignación masiva
            $task = Orden::create($validatedData);

            return response()->json([
                'message' => 'Orden creada con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear la Orden.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function show(Request $request)
    {
        $task = Orden::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'id' => 'required',
            'tipo' => 'string',
            'estado' => 'nullable|string|in:Por empezar,En curso,Completada',
            'visto' => 'boolean',
            'fecha_carga' => 'date',
            'fecha_descarga' => 'date',
            'id_grua' => 'int',
            'id_administrativo' => 'int',
            'id_buque' => 'int',
            'id_contenedor' => 'int',
            'id_zona' => 'int',
        ]);

        try {
            $task = Orden::findOrFail($validatedData["id"]);

        // Usar fill() en lugar de update() para mayor control
        $task->fill($validatedData);

        if ($task->isDirty()) { // Verifica si hay cambios antes de guardar
            $task->save();
        }

            return response()->json([
                'message' => 'Orden actualizada con éxito en la base de datos.',
                'task' => $validatedData,
            ], 200);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar la Orden.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function destroy(Request $request)
    {
        $task = Orden::destroy($request->id);  //task tienen el id que se ha borrado

        return response()->json([
            "message" => "Orden con id =" . $task . " ha sido borrado con éxito"
        ], 201);
        //Esta función obtendra el id de la tarea que hayamos seleccionado y la borrará de nuestra BD
    }

    public function crearOpciones() {
        $zonas = Zona::all();
        $buques = Buque::all();
        $operadores = DB::table('users')
        -> select('*')
        -> where('cargo', 'operador')
        -> get();

        return view('Administrativo.crearOrden', ['zonas' => $zonas, 'buques' => $buques, 'operadores' => $operadores]);
    }

    public function guardarOrden(Request $request) {
        $orden = $request -> validate([
            'tipo' => 'string',
            'operador' => 'int',
            'id_zona' => 'int',
            'id_buque' => 'int',
        ]);

        try {
            $operador = Operador::findOrFail($orden['operador']);
            $turno = Turno::findOrFail($operador['id_turno']);

            $tiene = DB::table('tiene')
                -> where('id_buque', $orden['id_buque'])
                -> count();

            $zona = Zona::findOrFail($orden['id_zona']);
            $buque = Buque::findOrFail($orden['id_buque']);

            $administrativo = Auth::user();

            Orden::create([
                "id" => null,
                "tipo" => $orden['tipo'],
                "cantidad_contenedores" => $tiene,
                "fecha_inicio" => $turno['fecha_inicio'],
                "visto" => '0',
                "fecha_fin" => $turno['fecha_fin'],
                "estado" => "Por empezar",
                "id_grua" => $zona['id_grua'],
                "id_administrativo" => $administrativo['id'],
                "id_operador" => $orden['operador'],
                "id_buque" => $orden['id_buque'],
                "id_zona" => $orden['id_zona'],
            ]);

            $mensaje = "¡Grua creada con éxito!";
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la Orden.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return redirect() -> route('exito') -> with([
            'cabecera' => "Crear orden",
            'mensaje' => "¡Orden creada con éxito!"
        ]);
    }

    public function verAuditoria(Request $request) {
        $orden = DB::table('orden')
        -> join('grua', 'orden.id_grua', '=', 'grua.id')
        -> join('buque', 'orden.id_buque', '=', 'buque.id')
        -> join('turno', 'orden.id', '=', 'turno.id_orden')
        -> join('operador', 'turno.id_operador', '=', 'operador.id')
        -> select('orden.id', 'grua.nombre as id_grua', 'orden.tipo', 'buque.nombre as id_buque')

        //Subconsulta Operador.
        -> selectSub(function ($query) {
            $query -> from('turno')
                -> select('operador.nombre')
                -> whereColumn('turno.id_orden', 'orden.id')
                -> limit(1);
        }, 'tipo')
        -> where('orden.id',1)
        -> get();

        return $orden;
    }

    public function verOrden() {
        $task = DB::table('orden')
        -> select('*')
        //Subconsulta Operador.
        -> selectSub(function ($query) {
            $query -> from('turno')
                -> select('turno.fecha_inicio')
                -> whereColumn('turno.id_orden', 'orden.id')
                -> limit(1);
        }, 'turno')
        -> where('id', 1)
        -> get();

        return $task;
    }

    /**
     * Funcion para mostrar las auditorias con Datatables.
     */
    public function visualizarAuditoria() {
        $orden = Orden::select(['id', 'tipo', 'estado'])
        -> where('estado', '!=', 'completada')
        -> get();

        return DataTables::of($orden)
            -> make(true);
    }

    public function mostrarUno($id) {
        $orden = DB::table('orden')
            -> join ('grua', 'orden.id_grua', '=' , 'grua.id')
            -> join ('operador', 'orden.id_operador', '=' , 'operador.id')
            -> join ('buque', 'orden.id_buque', '=' , 'buque.id')
            -> join ('tiene', 'buque.id', '=' , 'tiene.id_buque')
            -> join('turno', 'operador.id_turno', '=', 'turno.id')
            -> where ('orden.id', $id)

            -> select('orden.id_grua', 'orden.id_operador', 'orden.id_buque', 'orden.id', 'orden.tipo', 'orden.estado', 'turno.fecha_inicio')

            //Subconsulta Grua.
            -> selectSub(function ($query) {
                $query -> from('orden')
                    -> select('grua.nombre')
                    -> whereColumn('orden.id_grua', 'grua.id')
                    -> limit(1);
            }, 'id_grua')
            //Subconsulta Operador.
            -> selectSub(function ($query) {
                $query -> from('orden')
                    -> select('operador.nombre')
                    -> whereColumn('orden.id_operador', 'operador.id')
                    -> limit(1);
            }, 'id_operador')
            //Subconsulta Buque.
            -> selectSub(function ($query) {
                $query -> from('orden')
                    -> select('buque.nombre')
                    -> whereColumn('orden.id_buque', 'buque.id')
                    -> limit(1);
            }, 'id_buque')
            //Subconsulta Contenedor.
            -> selectSub(function ($query) {
                $query -> from('buque')
                    -> select('tiene.id_contenedor')
                    -> whereColumn('buque.id', 'tiene.id_buque')
                    -> limit(1);
            }, 'id_contenedor')

            -> join('contenedor', 'tiene.id_contenedor', '=', 'contenedor.id')
            -> join('zona', 'contenedor.id_zona', '=', 'zona.id')

            //Ubicacion y destino.
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

            -> first();

        if ($orden) {
            return view('Administrativo/Auditorias/realizarAuditorias', compact('orden'));
        } else {
            return redirect() -> route('Administrativo/Auditorias/verAuditoria');
        }
    }
}
