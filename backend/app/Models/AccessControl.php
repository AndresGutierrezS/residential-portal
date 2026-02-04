<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessControl extends Model
{
    protected $fillable = [
        'apartment_id',
        'code',
    ];
}
