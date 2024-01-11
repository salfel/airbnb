<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\In;

class RentStatusController extends Controller
{
    public function __invoke(Request $request, Rent $rent)
    {
        Gate::authorize('updateStatus', $rent);

        $validated = $request->validate([
            'status' => Rule::in(config('constants.rent.status'))
        ]);

        $rent->status = $validated['status'];
        $rent->save();

        return redirect()->back();
    }
}
