<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class ApartmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => ['required', 'min:3'],
            'description' => ['required', 'min:10'],
            'city' => ['required'],
            'country' => ['required', Rule::in(config('constants.countries'))],
            'price' => ['required', 'integer', 'min:1'],
            'square_meters' => ['required', 'integer', 'min:1'],
            'baths' => ['required', 'integer', 'min:1'],
            'beds' => ['required', 'integer', 'min:1'],
            'guests' => ['required', 'integer', 'min:1'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date'],
            'images' => ['required', 'array', 'min:1'],
            'images.*' => [File::image()->max(1024 * 5)],
            'attributes' => ['required', 'array', 'min:1'],
            'attributes.*' => [Rule::in(config('constants.apartment.attributes'))],
        ];
    }

    public function messages(): array
    {
        return [
            'price.min' => 'The :attribute field must be positive',
            'square_meters.min' => 'The :attribute field must be positive',
            'baths.min' => 'The :attribute field must be positive',
            'beds.min' => 'The :attribute field must be positive',
            'guests.min' => 'The :attribute field must be positive',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
