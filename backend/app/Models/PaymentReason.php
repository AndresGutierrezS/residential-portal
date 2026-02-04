<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentReason extends Model
{
    protected $fillable = [
        'reason'
    ];

    public function payment()
    {
        return $this->hasMany(Payment::class);
    }
}
