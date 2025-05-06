<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Laravel\Passport\Passport;

class AuthController extends Controller {
    public $successStatus = 200;
    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login() {
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json(['success' => $success, 'user'=> $user],
            $this->successStatus)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    public function logout(Request $request)
    {

        $isUser = $request->user()->token()->revoke();
        if($isUser){
            $success['message'] = "Successfully logged out.";
            return response()->json(['success' => $isUser], $this->successStatus);
        }
        else{
            return response()->json(['error' => 'Unauthorised'], 401);
        }

        return view('login');

    }

    public function volver(){

        return redirect()->route('operador/logout');

    }
}
