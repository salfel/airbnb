<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'stars' => ['required', 'integer'],
            'message' => ['required', 'string', 'min:12'],
        ];
    }
}
