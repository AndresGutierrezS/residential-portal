<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'event_date',
        'description',
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
