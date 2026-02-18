<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Message $message)
    {
        $this->message->load('sender');
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chat'),
        ];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'sender_id' => $this->message->sender_id,
            'receiver_id' => $this->message->receiver_id,
            'apartment_from_id' => $this->message->apartment_from_id,
            'apartment_to_id' => $this->message->apartment_to_id,
            'message' => $this->message->message,
            'sent_at' => $this->message->sent_at,
            'created_at' => $this->message->created_at,
            'updated_at' => $this->message->updated_at,

            'sender' => [
                'id' => $this->message->sender->id,
                'name' => $this->message->sender->name,
                'last_name' => $this->message->sender->last_name,
                'second_last_name' => $this->message->sender->second_last_name,
                'phone' => $this->message->sender->phone,
                'is_active' => $this->message->sender->is_active,
                'created_at' => $this->message->sender->created_at,
                'updated_at' => $this->message->sender->updated_at,
            ],
        ];
    }
}
