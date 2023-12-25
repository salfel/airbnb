<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApartmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'city' => ['required'],
            'country' => ['required'],
            'price' => ['required', 'integer'],
            'location' => ['required'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date'],
            'thumbnail' => ['required'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
