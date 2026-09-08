<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'location',
        'type',
        'max_attendees',
        'event_date',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
