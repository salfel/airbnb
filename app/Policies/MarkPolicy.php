<?php

namespace App\Policies;

use App\Models\Mark;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MarkPolicy
{
    use HandlesAuthorization;

    public function create(User $user): bool
    {
        return true;
    }

    public function delete(User $user, Mark $mark): bool
    {
        return $mark->user_id === $user->id;
    }
}
