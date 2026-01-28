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

    
}
