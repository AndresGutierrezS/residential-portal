<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    
    public function sendCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email'
        ]);

        $code = rand(100000, 999999);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $request->email],
            [
                'code' => $code,
                'expires_at' => Carbon::now()->addMinutes(10),
                'created_at' => now(),
                'updated_at' => now()
            ]
        );

        Mail::raw("Tu código de recuperación es: $code", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Recuperación de contraseña');
        });

        return response()->json([
            'message' => 'Código enviado'
        ]);
    }


    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required'
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Código inválido'], 400);
        }

        if (Carbon::parse($record->expires_at)->isPast()) {
            return response()->json(['message' => 'Código expirado'], 400);
        }

        return response()->json([
            'message' => 'Código válido'
        ]);
    }


    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required',
            'password' => 'required|min:6|confirmed'
        ]);

        $record = DB::table('password_resets')
            ->where('email', $request->email)
            ->where('code', $request->code)
            ->first();

        if (!$record) {
            return response()->json(['message' => 'Código inválido'], 400);
        }

        if (Carbon::parse($record->expires_at)->isPast()) {
            return response()->json(['message' => 'Código expirado'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Contraseña actualizada'
        ]);
    }

}
