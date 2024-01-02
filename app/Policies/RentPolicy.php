<?php

namespace App\Policies;

use App\Models\Rent;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RentPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Rent $rent): bool
    {
        return $user->id == $rent->user->id || $user->id == $rent->apartment->host->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Rent $rent): bool
    {
        return $user->id == $rent->user->id;
    }

    public function delete(User $user, Rent $rent): bool
    {
        return $user->id == $rent->user->id;
    }
}
