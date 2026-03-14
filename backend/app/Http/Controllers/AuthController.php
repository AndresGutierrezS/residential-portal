<?php

namespace App\Http\Controllers;

use App\Models\Person;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

       $user = User::with([
                'person.apartmentPeople.role'
            ])->where('email', $request->email)->first();

        if( !$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }

        $device = $request->device_name ?? $request->userAgent();

        $token = $user->createToken($device)->plainTextToken;

        return response()->json([
            'user' => $user->load('person'),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'last_name' => 'required',
            'second_last_name' => 'required',
            'phone' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed'
        ]);

        try {
            $person = Person::create([
                'name' => $request->name,
                'last_name' => $request->last_name,
                'second_last_name' => $request->second_last_name,
                'phone' => $request->phone,
                'is_active' => true
            ]);

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_admin' => false,
                'person_id' => $person->id,
            ]);

            event(new Registered($user));

            return response()->json([
                'message' => 'User registered',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage()
            ], 500);

        }

    }
}
