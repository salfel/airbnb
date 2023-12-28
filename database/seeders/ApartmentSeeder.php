<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Host;
use App\Models\User;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    public function run(): void
    {
        $host = Host::create([
            'user_id' => User::first()->id,
        ]);

        foreach (Apartment::all() as $apartment) {
            $apartment->delete();
        }

        Apartment::factory(20)->create([
            'host_id' => $host->id
        ]);
    }
}
