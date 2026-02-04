<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentType extends Model
{
    protected $fillable = [
        'type'
    ];

    public function payment()
    {
        return $this->hasMany(Payment::class);
    }
}
