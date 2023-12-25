<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ApartmentFactory extends Factory
{
    protected $model = Apartment::class;

    public function definition()
    {
        return [
            'city' => $this->faker->city(),
            'country' => $this->faker->country(),
            'price' => $this->faker->randomNumber(3),
            'location' => $this->faker->words(asText: true),
            'start' => Carbon::now(),
            'end' => Carbon::now()->addDays($this->faker->randomNumber(2)),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
