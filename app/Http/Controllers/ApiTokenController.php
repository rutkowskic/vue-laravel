<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\User;

use Illuminate\Support\Facades\Log;

class ApiTokenController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['create', 'login']]);
    }

    public function create(Request $request)
    {   
        $token = Str::random(80);

        User::forceCreate([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->password),
            'api_token' => hash('sha256', $token),
        ]);

        return response()->json(['token' => $token], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {

            $token = Str::random(80);
    
            $request->user()->forceFill([
                'api_token' => hash('sha256', $token),
            ])->save();
    
            return ['token' => $token, 'user' => $request->user()];
        }
        
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    
    public function logout()
    {
        $request->user()->forceFill([
            'api_token' => NULL,
        ])->save();
            
        return response()->json(['msg' => 'Logout!'], 201);
    }
    
    public function me()
    {
        return Auth::user();
    }
}
