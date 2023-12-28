<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {

        foreach (Apartment::all() as $apartment) {
            Review::factory(10)->create([
                'apartment_id' => $apartment->id,
                'user_id' => User::all()->random()->id
            ]);
        }
    }
}
