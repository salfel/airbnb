<?php

namespace Database\Seeders;

use App\Models\Host;
use App\Models\User;
use Illuminate\Database\Seeder;

class HostSeeder extends Seeder
{
    public function run(): void
    {
        foreach (User::all() as $user) {
            Host::create([
                'user_id' => $user->id,
            ]);
        }
    }
}
