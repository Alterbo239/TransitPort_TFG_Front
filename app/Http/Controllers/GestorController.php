<?php

namespace App\Http\Controllers;

use App\Models\Gestor;
use Illuminate\Http\Request;
use App\Models\User;

class GestorController extends Controller {

    public function index(Request $request) {
        $task = User::all();
        return $task;
       
    }

    public function show(Request $request)
    {
        $task = Gestor::findOrFail($request->id);
        return $task;
    }

    public function update(Request $request)
    {
       $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'usuario' => 'string',
            'password' => 'string',
            'cargo' => 'string',
            'estado' => 'string',
            'email' => 'string',
        ]);

        try {
            $task = Gestor::findOrFail($request["id"]);
            $task->update($validatedData);

            return response()->json([
                'message' => 'Gestor actualizado con éxito.',
                'task' => $task,
            ], 200);
            //Esta función actualizará la tarea que hayamos seleccionado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al actualizar el Gestor.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    public function destroy(Request $request)
    {
        $task = Gestor::findOrFail($request->id);
        $task->delete();

        return response()->json([
            "message" => "Usuario con id =" . $request->id . " ha sido borrado con éxito"
        ], 201);
        //Esta función obtendra el id de la tarea que hayamos seleccionado y la borrará de nuestra BD
    }

    //me lleva a la vista para crear usuarios  nuevos
    public function crearUsuario(){

        return view('Gestor.crearUsuario');

    }

    //almacena los datos del formulario en crear usuario
    public function guardarUsuario(Request $request){

        $user = $request -> validate([
            'name' => 'string',
            'usuario' => 'string',
            'email' => 'email',
            'telefono' => 'string',
            'ciudad' => 'string',
            'codigoPostal' => 'string',
            'password' => 'string',
            'cargo' => 'string|in:gestor,administrativo,operador',
        ]);

        try {
            $user['password'] = bcrypt($user['password']);
            User::create($user);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el usuario.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return view('Gestor.crearUsuario');

    }
    

    

    

    }


