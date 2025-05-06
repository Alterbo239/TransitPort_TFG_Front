<?php

namespace App\Http\Controllers;

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

}
