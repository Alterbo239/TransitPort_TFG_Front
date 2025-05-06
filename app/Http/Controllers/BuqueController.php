<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Buque;

class BuqueController extends Controller
{
    public function show(Request $request)
    {
        $task = Buque::findOrFail($request->id);
        return $task;
    }
}
