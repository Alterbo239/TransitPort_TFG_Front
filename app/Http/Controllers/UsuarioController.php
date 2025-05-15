<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Http\Request;

use App\Models\Empresa;
use App\Models\Cliente;
use App\Models\Documento;

class UsuarioController extends Controller {

    public function index(Request $request) {

        $usuarios = User::where('cargo', '!=', 'gestor')->get();//sirve para extraer solo los usuarios que no sean gestores en la tabla de angular
        return $usuarios;

    }

    public function modificarEstado(Request $request, $id) {

        $request->validate([
            'estado' => 'required|string|in:Activo/a,Inactivo/a', //valido el estado del usuario
        ]);


        $user = User::findOrFail($id);//busca el usuario
        $user->estado = $request->input('estado');//le asigno el estado
        $user->save();//lo guardo

        return response()->json([
            'message' => 'Actualizado correctamente',
            'estado' => $user->estado,
        ]);
    }

    public function getEmpresaCliente($id) {
        $cliente = Cliente::findOrFail($id);
        return $cliente -> id_empresa;
    }

    public function registro() {
        $this -> eraseSessions();

        return view('Client.Registro.Registro_p1');
    }

    public function eraseSessions() {
        session() -> forget('registro_datos');
    }

    public function validarRegistro1(Request $request) {
        $part1 = $request -> validate([
            'nombre' => 'string',
            'apellidos' => 'string',
            'usuario' => 'string',
            'telefono' => 'string',
            'email' => 'string',
            'autonomo' => 'boolean',
            'ciudad' => 'string',
            'codigo_postal' => 'integer',
        ]);

        session(['registro_datos' => $part1]);

        if (User::where('usuario', $part1['usuario'])->first()) {
            return redirect() -> back() -> with('errorUsuario', 'El usuario ya está registrado.');
        }
        if (User::where('email', $part1['email'])->first()) {
            return redirect() -> back() -> with('errorEmail', 'Ese email ya ha sido registrado.');
        }

        return view('Client.Registro.Registro_p2');
    }

    public function subirRegistro(Request $request) {

        $task = $request -> validate([
            'password' => 'string',
            'repeat_password' => 'string',
            'document' => 'mimes:pdf',
        ]);

        try {
            $fullname = session('registro_datos.nombre') . ' ' . session('registro_datos.apellidos');
            $pass = bcrypt($task['password']);

            // Crear y guardar la peticion de cita.
            $user = User::create([
                "id" => null,
                "name" => $fullname,
                "email" => session('registro_datos.email'),
                "usuario" => session('registro_datos.usuario'),
                "telefono" => session('registro_datos.telefono'),
                "ciudad" => session('registro_datos.ciudad'),
                "codigoPostal" => session('registro_datos.codigo_postal'),
                "estado" => 'Inactivo/a',
                "password" => $pass,
                "cargo" => 'cliente',
            ]);

            Cliente::create([
                "id" => $user -> id,
                "nombre" => $user -> name,
                "usuario" => $user -> usuario,
                "password" => $user -> password,
                "cargo" => 'cliente',
                "autonomo" => session('registro_datos.autonomo'),
                "estado" => 'Inactivo/a',
                "id_empresa" => null,
            ]);

            return response()->json([
                'message' => 'Usuario y Cliente creados con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear al Usuario o al Cliente.',
                'error' => $e->getMessage(),
            ], 500);
        }

        $pdf = $request -> file('document');

        $path = $pdf -> store('uploads', 'public');

        try {
            $id_cliente = Client::
            // Crear y guardar la peticion de cita.
            Documento::create([
                "id" => null,
                "nombre" => $request->file('document')->getClientOriginalName(),
                "ruta" => $path,
                "fecha" => now(),
                "estado" => "Activo",
                "id_gestor" => null,
                "id_cliente" => 11,
            ]);

            return redirect() -> route('exitoCliente') -> with([
                'cabecera' => "Registro",
                'mensaje' => "Usted se registró con exito, espere a que le den de alta."
            ]);

            return response()->json([
                'message' => 'Documento creado con éxito.',
                'task' => $task,
            ], 201); // Código HTTP 201: Creado

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error al crear el Documento.pdf.',
                'error' => $e->getMessage(),
            ], 500);
        }

        return redirect() -> route('loginCliente');
    }

}
