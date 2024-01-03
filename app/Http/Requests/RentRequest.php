<?php

namespace App\Http\Requests;

use App\Rules\ExceedsMaxRule;
use Illuminate\Foundation\Http\FormRequest;

class RentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'guests' => ['required', 'integer', new ExceedsMaxRule('apartments', $this->route('apartment')->id, 'guests')],
            'description' => ['required', 'string', 'min:3'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date'],
        ];
    }
}
