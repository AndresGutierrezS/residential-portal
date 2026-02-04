<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $fillable = [
        'name',
        'is_overdue',
        'code'
    ];

    public function apartmentPeople()
    {
        return $this->hasMany(ApartmentPerson::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    
    public function cars()
    {
        return $this->hasMany(Car::class);
    }

    public function accessControls()
    {
        return $this->hasMany(AccessControl::class);
    }
}
