<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class ExceedsMaxRule implements ValidationRule
{
    public function __construct(private readonly string $table, private readonly string $id, private readonly string $maxColumn)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $maxValue = DB::table($this->table)->where('id', $this->id)->value($this->maxColumn);

        if ($value > $maxValue) {
            $fail("The {$attribute} exceeds the maximum value of {$maxValue}.");
        }
    }
}
