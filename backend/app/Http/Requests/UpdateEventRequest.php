<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:100'],
            'max_attendees' => ['nullable', 'integer', 'min:1'],
            'event_date' => ['required', 'date'],
        ];
    }
}