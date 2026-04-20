<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'apartment_id' => 'required|exists:apartments,id',
            'amount' => 'required|numeric|min:0',
            'payment_type_id' => 'required|exists:payment_types,id',
            'payment_reason_id' => 'required|exists:payment_reasons,id',
            'date' => 'required|date',
            'description' => 'required|string',
            'receipt' => 'required|string',
            'is_paid' => 'required|boolean',
            'report_id' => 'nullable|exists:reports,id',

            'month' => 'nullable|integer|min:1|max:12',
            'year' => 'nullable|integer|min:2000',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $typeId = $this->input('payment_type_id');

            $type = \App\Models\PaymentType::find($typeId);

            if ($type && $type->type === 'Maintenance') {
                if (!$this->input('month') || !$this->input('year')) {
                    $validator->errors()->add('month', 'Month and year are required for maintenance.');
                }
            }
        });
    }
}
