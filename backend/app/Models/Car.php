<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'apartment_id',
        'plate',
        'brand',
        'model',
        'color',
    ];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }
}
