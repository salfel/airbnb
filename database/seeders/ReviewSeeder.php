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
        $userCount = User::count();

        foreach (Apartment::all() as $apartment) {
            Review::factory(20)->create([
                'apartment_id' => $apartment->id,
                'user_id' => fn () => rand(1, $userCount),
            ]);
        }
    }
}
