<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Http\Request;

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

    public function registro() {
        $this -> eraseSessions();

        return view('Client.Registro.Registro_p1');
    }

    public function eraseSessions() {
        session() -> forget(['registro_datos', 'registro_datos2']);
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

        return view('Client.Registro.Registro_p2');
    }

    public function validarRegistro2(Request $request) {

        $part2 = $request -> validate([
            'password' => 'string',
            'repeat_password' => 'string',
            'nombre_empresa' => 'string',
            'ciudad_empresa' => 'string',
            'codigo_postal_empresa' => 'integer',
            'cif' => 'string',
            'email_empresa' => 'string',
        ]);

        session(['registro_datos2' => $part2]);

        return view('Client.Registro.Registro_p3');
    }

    public function subirRegistro(Request $request) {
        $task = $request -> validate([
            'document' => 'mimes:pdf',
        ]);

        $pdf = $request -> file('document');

        $path = $pdf -> store('uploads', 'public');

        return redirect() -> route('loginCliente');
    }

}
