<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Host;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    public function run(): void
    {
        $hostCount = Host::count();
        Apartment::factory(100)->create([
            'host_id' => fn () => rand(1, $hostCount),
        ]);
    }
}
