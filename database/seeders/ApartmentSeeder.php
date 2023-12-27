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

        Apartment::factory(50)->create([
            'host_id' => $host->id
        ]);
    }
}
