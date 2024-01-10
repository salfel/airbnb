<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Felix Salcher',
            'email' => 'felix.salcher@gmail.com',
            'password' => 'password',
        ]);

        User::factory(10)->create();

        $this->call([
            HostSeeder::class,
            ApartmentSeeder::class,
            ReviewSeeder::class,
            RentSeeder::class,
            MarkSeeder::class,
        ]);
    }
}
