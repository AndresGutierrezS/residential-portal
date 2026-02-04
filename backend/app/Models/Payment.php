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

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function paymentType()
    {
        return $this->belongsTo(PaymentType::class);
    }
    public function paymentReason()
    {
        return $this->belongsTo(PaymentReason::class);
    }
    public function report()
    {
        return $this->belongsTo(Report::class);
    }
    public function maintenance()
    {
        return $this->hasOne(Maintenance::class);
    }
}
