<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Validator;

class OrRule implements ValidationRule
{
    private string $message = '';

    public function __construct(private $rule1, private $rule2)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $validator1 = Validator::make(
            [$attribute => $value],
            [$attribute => $this->rule1],
        );

        if ($validator1->passes()) {
            return;
        }

        $validator2 = Validator::make(
            [$attribute => $value],
            [$attribute => $this->rule2],
        );

        if ($validator2->fails()) {
            $fail($validator1->errors()->merge($validator2->errors())->first($attribute));
        }
    }
}
