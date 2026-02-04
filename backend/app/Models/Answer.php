<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = [
        'question_id',
        'attendance_id',
        'answer',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function attendance()
    {
        return $this->belongsTo(Attendance::class);
    }
}
