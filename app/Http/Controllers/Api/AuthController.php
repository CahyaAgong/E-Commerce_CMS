<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validasi input
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:ecm_users',
            'password' => 'required|string|min:6',
            'role_id' => 'required|string'
        ]);

        // Buat pengguna baru
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
            'role_id' => $validatedData['role_id'],
        ]);

        // Generate token
        // $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Register success...'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($credentials)) {
            // Jika otentikasi berhasil, berikan token
            // $token = $request->user()->createToken('auth_token')->plainTextToken;

            $id = auth()->user()->id;

            $currentUser = User::with('role')
                                ->where('id', $id)
                                ->first();

            return response()->json(['status' => 200, 'message' => 'Login Success...', 'data' => $currentUser], 200);
        }

        // Jika otentikasi gagal
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
