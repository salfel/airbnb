<?php

namespace App\Policies;

use App\Models\Apartment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ApartmentPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {

    }

    public function view(User $user, Apartment $apartment)
    {
    }

    public function create(User $user)
    {
    }

    public function update(User $user, Apartment $apartment)
    {
    }

    public function delete(User $user, Apartment $apartment)
    {
    }
}
