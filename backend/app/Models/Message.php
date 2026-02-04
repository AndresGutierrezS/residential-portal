<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'apartment_from_id',
        'apartment_to_id',
        'message',
        'sent_at',
    ];

    public function sender()
    {
        return $this->belongsTo(Person::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(Person::class, 'receiver_id');
    }
}
