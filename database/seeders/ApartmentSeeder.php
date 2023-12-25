<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\User;
use Illuminate\Database\Seeder;

class ApartmentSeeder extends Seeder
{
    public function run(): void
    {
        Apartment::factory(50)->create([
            'user_id' => User::first()->id
        ]);
    }
}
