<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'person_id',
        'event_id',
        'time',
    ];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
