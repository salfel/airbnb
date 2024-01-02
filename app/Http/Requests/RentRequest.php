<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'apartment_id' => ['required', 'exists:apartments,id'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
