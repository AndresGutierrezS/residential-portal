<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;


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

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware('signed')
    ->name('verification.verify');


Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return response()->json([
        'message' => 'Verification email sent'
    ]);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');



