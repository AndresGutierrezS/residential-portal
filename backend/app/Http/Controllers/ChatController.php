<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Message::with('sender')
            ->whereNull('receiver_id')
            ->whereNull('apartment_to_id')
            ->orderBy('sent_at', 'asc')
            ->limit(50)
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:2000'
        ]);

        $message = Message::create([
            'sender_id' => Auth::id() ?? 1,
            'receiver_id' => null,
            'apartment_from_id' => null,
            'apartment_to_id' => null,
            'message' => $request->message,
            'sent_at' => now(),
        ]);

        broadcast(new MessageSent($message))->toOthers();
        return response()->json($message);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
