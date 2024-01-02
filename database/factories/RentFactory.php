<?php

namespace Database\Factories;

use App\Models\Rent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RentFactory extends Factory
{
    protected $model = Rent::class;

    public function definition(): array
    {
        return [
            'start' => Carbon::now(),
            'end' => Carbon::now()->addDays(rand(1, 14)),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
