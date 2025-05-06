<?php

namespace App\Http\Controllers;

use App\Models\Operador;
use App\Models\Turno;
use DateInterval;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class TurnoController extends Controller {

    public function index(Request $request) {
        $task = Turno::all();
        return $task;
        //Esta función nos devolvera todas las tareas que tenemos en nuestra BD
    }

    public function store(Request $request) {
       $validatedData = $request->validate([
            'fecha_inicio' => 'date',
            'fecha_fin' => 'date',
            'id_orden' => 'int',
            'id_operador' => 'int',
        ]);

        try {
            // Crear y guardar la tarea con asignación masiva
            $task = Turno::create($validatedData);

            return response()->json([
                'message' => 'Turno creado con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el turno.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function show(Request $request)
    {
        $task = Turno::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'fecha_inicio' => 'date',
            'fecha_fin' => 'date',
            'id_orden' => 'int',
            'id_operador' => 'int',
        ]);

        try {
            $task = Turno::findOrFail($request["id"]);
            $task->update($validatedData);

            return response()->json([
                'message' => 'Turno actualizado con éxito.',
                'task' => $task,
            ], 200);
            //Esta función actualizará la tarea que hayamos seleccionado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar el turno.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function destroy(Request $request)
    {
        $task = Turno::destroy($request->id);  //task tienen el id que se ha borrado

        return response()->json([
            "message" => "Turno con id =" . $task . " ha sido borrado con éxito."
        ], 201);
        //Esta función obtendra el id de la tarea que hayamos seleccionado y la borrará de nuestra BD
    }

    public function guardarTurno(Request $request) {
        $turno = $request->validate([
            'fecha' => 'date',
            'hora_inicio' => 'date_format:H:i',
            'horas' => 'int',
        ]);

        try {
            $fecha = $turno['fecha'];
            $hora = $turno['hora_inicio'];
            $fecha_inicial = new DateTime("$fecha $hora");

            $fecha_fin = new DateTime("$fecha $hora");
            //A la fecha fin le sumamos las horas indicadas por el formulario. Modelo: P7Y5M4DT4H3M2S (P -> Años, Meses, Dias /T -> Horas, Minutos, Segundos)
            $fecha_fin -> add(new DateInterval('PT'.$turno['horas'].'H'));

            Turno::create([
                'fecha_inicio' => $fecha_inicial,
                'fecha_fin' => $fecha_fin,
                'id_orden' => '1',
                'id_operador' => '5',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al guardar el turno.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return redirect() -> route('exito') -> with([
            'cabecera' => "Crear turno",
            'mensaje' => "¡Turno creado con éxito!",
        ]);
    }

    public function crearOpciones() {
        $operadores = Operador::all();
        $turnos = Turno::all();

        return view('Administrativo.asignarTurno', ['operadores' => $operadores, 'turnos' => $turnos]);
    }

    public function actualizarTurno(Request $request) {
        $turno = $request -> validate([
            'id_operador' => 'int',
            'id_turno' => 'int'
        ]);

        try {
            $operador = Operador::findOrFail($turno['id_operador']);
            $operador -> update($turno);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el turno.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return redirect() -> route('exito') -> with([
            'cabecera' => "Actualizar turno",
            'mensaje' => "A " . $operador -> nombre . " se le ha actualizado el turno con exito.",
        ]);
    }
}
