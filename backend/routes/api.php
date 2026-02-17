<?php

use Illuminate\Support\Facades\Route;
use App\Events\MessageSent;
use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;

Route::post('/messages', function (Request $request) {
    event(new MessageSent(
        $request->message,
        1 
    ));

    return response()->json(['status' => 'sent']);
});

Route::get('chat/messages', [ChatController::class, 'index']);
Route::post('chat/messages', [ChatController::class, 'store']);


