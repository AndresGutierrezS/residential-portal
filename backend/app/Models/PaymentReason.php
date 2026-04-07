<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentReason extends Model
{
    protected $fillable = [
        'reason'
    ];

    // public function payments()
    // {
    //     return $this->hasMany(Payment::class);
    // }

    public function type()
    {
        return $this->belongsTo(PaymentType::class, 'payment_type_id');
    } 
}
