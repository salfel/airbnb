<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Rent;
use App\Models\User;
use Illuminate\Database\Seeder;

class RentSeeder extends Seeder
{
    public function run(): void
    {
        $userCount = User::count();
        foreach (Apartment::all() as $apartment) {
            Rent::factory(5)->create([
                'apartment_id' => $apartment->id,
                'user_id' => fn () => rand(1, $userCount),
                'start' => fn () => $apartment->start->addDays(rand(0, 6)),
                'end' => fn () => $apartment->end->subDays(rand(0, 6)),
            ]);
        }
    }
}
