<?php

use Illuminate\Support\Facades\Route;
use App\Events\MessageSent;
use Illuminate\Http\Request;

Route::post('/messages', function (Request $request) {
    event(new MessageSent(
        $request->message,
        1 
    ));

    return response()->json(['status' => 'sent']);
});


