<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'question',
        'event_id',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
