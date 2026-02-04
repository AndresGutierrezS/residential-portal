<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'apartment_id',
        'amount',
        'payment_type_id',
        'date',
        'payment_reason_id',
        'description',
        'receipt',
        'is_paid',
        'report_id',
    ];
}
