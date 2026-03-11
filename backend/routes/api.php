<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NotificationController;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

// Route::post('/messages', function (Request $request) {
//     event(new MessageSent(
//         $request->message,
//         1 
//     ));

//     return response()->json(['status' => 'sent']);
// });

Route::post('login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('user', function (Request $request) {
        return $request->user()->load('person');
    });

    Route::get('chat/messages', [ChatController::class, 'index']);
    Route::post('chat/messages', [ChatController::class, 'store']);
    
    Route::get('notifications/{userId}', [NotificationController::class, 'index']);
    Route::post('notifications/{userId}', [NotificationController::class, 'store']);
    Route::patch('notifications/{userId}/read-all', [NotificationController::class, 'markAllAsRead']);

    
});
    
Route::middleware('auth:sanctum', 'admin')->group(function () {
    Route::apiResource('cars', CarController::class);
        
});

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user()->load(
        'person.apartments',
        'person.apartmentPeople.role'
    );
});

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {

    if (! URL::hasValidSignature($request)) {
        return response()->json([
            'message' => 'Invalid or expired verification link'
        ], 401);
    }

    $user = User::findOrFail($id);

    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json([
            'message' => 'Invalid verification hash'
        ], 401);
    }

    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }

    return response()->json([
        'message' => 'Email verified successfully'
    ]);

})->middleware('signed')->name('verification.verify');


Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return response()->json([
        'message' => 'Verification email sent'
    ]);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');



