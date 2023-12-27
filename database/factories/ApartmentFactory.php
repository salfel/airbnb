<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class ApartmentFactory extends Factory
{
    protected $model = Apartment::class;

    public function definition(): array
    {
        return [
            'city' => $this->faker->city(),
            'country' => $this->faker->country(),
            'price' => $this->faker->randomNumber(3, true),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'beds' => $this->faker->randomNumber(1),
            'baths' => $this->faker->randomNumber(1),
            'images' => array_fill(0, 3, null),
            'start' => Carbon::now(),
            'end' => Carbon::now()->addDays($this->faker->randomNumber(2)),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
