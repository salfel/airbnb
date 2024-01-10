<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Mark;
use App\Models\User;
use Illuminate\Database\Seeder;

class MarkSeeder extends Seeder
{
    public function run(): void
    {
        $apartmentCount = Apartment::count();
        foreach (User::all() as $user) {
            Mark::factory(10)->create([
                'user_id' => $user->id,
                'apartment_id' => fn() => rand(1, $apartmentCount),
            ]);
        }
    }
}
