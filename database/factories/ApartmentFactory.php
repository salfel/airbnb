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
        $baseAttributes = config('constants.apartment.attributes');
        $attributes = [];
        for ($i = 0; $i < 10; $i++) {
            $attributes[$i] = $this->faker->randomElement($baseAttributes);
            unset($baseAttributes[array_search($attributes[$i], $baseAttributes)]);
        }

        $start = rand(0, 1) ? Carbon::now()->subDays(rand(0, 365)) : Carbon::now()->addDays(rand(0, 365));

        return [
            'city' => $this->faker->city(),
            'country' => $this->faker->country(),
            'price' => $this->faker->randomNumber(3, true),
            'square_meters' => $this->faker->randomNumber(2, true),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'beds' => $this->faker->randomNumber(1),
            'baths' => $this->faker->randomNumber(1),
            'guests' => $this->faker->randomNumber(1),
            'images' => array_fill(0, 3, null),
            'attributes' => $attributes,
            'start' => $start,
            'end' => $start->addDays(rand(1, 14)),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
