<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maintenance extends Model
{
    protected $fillable = [
        'month',
        'year',
        'is_completed',
        'amount',
        'payment_id',
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
