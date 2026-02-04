<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApartmentPerson extends Model
{
    protected $table = 'apartment_person';

    protected $fillable = [
        'person_id',
        'apartment_id',
        'role_id',
        'is_resident',
        'code',
    ];

    public function person()
    {
        return $this->belongsTo(Person::class);
    }

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
