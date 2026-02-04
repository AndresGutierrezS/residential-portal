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

    public function sender()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function apartmentPerson()
    {
        return $this->hasMany(ApartmentPerson::class);
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }
}
