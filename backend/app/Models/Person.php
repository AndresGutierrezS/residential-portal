<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'name',
        'last_name',
        'second_last_name',
        'phone',
        'is_active',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function senders()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivers()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function apartmentPeople()
    {
        return $this->hasMany(ApartmentPerson::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
