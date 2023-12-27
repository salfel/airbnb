<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Host;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    public function run(): void
    {
        $host = Host::create([
            'user_id' => User::first()->id,
        ]);

        $apartments = Apartment::factory(20)->create([
            'host_id' => $host->id
        ]);

        foreach ($apartments as $apartment) {
            Review::factory(10)->create([
                'apartment_id' => $apartment->id,
                'user_id' => User::all()->random()->id
            ]);
        }
    }
}
