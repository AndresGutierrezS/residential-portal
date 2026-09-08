<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        return response()->json(
            Event::orderBy('event_date', 'desc')->get()
        );
    }

    public function store(StoreEventRequest $request)
    {
        $event = Event::create(
            $request->validated()
        );

        return response()->json(
            $event,
            201
        );
    }

    public function show(string $id)
    {
        return response()->json(
            Event::findOrFail($id)
        );
    }

    public function update(
        UpdateEventRequest $request,
        string $id
    ) {
        $event = Event::findOrFail($id);

        $event->update(
            $request->validated()
        );

        return response()->json($event);
    }

    public function destroy(string $id)
    {
        $event = Event::findOrFail($id);

        $event->delete();

        return response()->json([
            'message' => 'Evento eliminado'
        ]);
    }
}