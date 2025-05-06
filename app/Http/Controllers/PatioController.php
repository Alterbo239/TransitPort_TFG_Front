<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Patio;
use Illuminate\Http\Request;

class PatioController extends Controller
{
    
    public function crearPatio(){

        return view('Gestor.crearPatio');

    }

    public function guardarPatio(Request $request){

        $patio = $request -> validate([
            'nombre' => 'required|string|max:255',
            'x' => 'required|numeric',
            'y' => 'required|numeric',
            'z' => 'required|numeric',
            'id_gestor' => 'required|exists:gestor,id',
        ]);

        $patio['capacidad'] = $patio['x'] * $patio['y'] * $patio['z'];
        $patio['id_gestor'] = Auth::id();

        try {
            $nuevoPatio=Patio::create($patio);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear el patio.',
                'error' => $e->getMessage(),
            ], 500);
        }

        session(['id_patio' => $nuevoPatio->id]);

        return redirect()->route('crearPatio');

    }

}
