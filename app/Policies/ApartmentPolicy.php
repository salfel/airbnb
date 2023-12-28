<?php

namespace App\Policies;

use App\Models\Apartment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ApartmentPolicy
{
    use HandlesAuthorization;

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Apartment $apartment)
    {
    }

    public function delete(User $user, Apartment $apartment)
    {
    }
}
