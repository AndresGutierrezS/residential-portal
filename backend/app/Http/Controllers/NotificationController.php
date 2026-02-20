<?php

namespace App\Http\Controllers;

use App\Events\NotificationCreated;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($userId)
    {
        return Notification::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store($userId)
    {
        $notification = Notification::create([
            'user_id' => $userId,
            'type' => 'fine',
            'title' => 'Nueva multa',
            'message' => 'Se ha generado una nueva multa',
            'url' => '/fines/123'
        ]);

        broadcast(new NotificationCreated($notification));

        return response()->json($notification);
    }

    /**
     * Display the specified resource.
     */
    public function show($userId)
    {
        // Notification::where('user_id', $userId)
        //     ->whereNull('read_at')
        //     ->update([
        //         'read_at' => now()
        //     ]);

        // return response()->json(['success', true]);
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

    public function markAllAsRead($userId)
    {
        Notification::where('user_id', $userId)
            ->whereNull('read_at')
            ->update([
                'read_at' => now()
            ]);

        return response()->json([
            'success' => true
        ]);
    }
}
