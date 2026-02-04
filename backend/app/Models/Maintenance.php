<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        'month',
        'year',
        'apartment_id',
        'is_completed',
        'amount',
        'payment_id',
    ];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
