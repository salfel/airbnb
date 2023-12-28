<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'starts' => ['required', 'integer'],
            'message' => ['required', 'string', 'min:12'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
