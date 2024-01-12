<?php

namespace App\Http\Controllers;

use App\Http\Requests\RentRequest;
use App\Models\Apartment;
use App\Models\Rent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class RentController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Rent::class);

        return Rent::all();
    }

    public function store(Apartment $apartment, RentRequest $request)
    {
        $response = Gate::inspect('create', Rent::class);

        if (! $response->allowed()) {
            session()->flash('message', [
                'title' => 'Not authorized',
                'message' => 'Please login to post a review for this apartment',
                'action' => 'login',
                'type' => 'destructive',
            ]);

            return redirect()->back();
        }

        Rent::create([
            'user_id' => Auth::id(),
            'apartment_id' => $apartment->id,
            ...$request->validated(),
        ]);

        return to_route('dashboard.rented');
    }

    public function destroy(Rent $rent)
    {
        $this->authorize('delete', $rent);

        $rent->delete();

        return redirect()->back();
    }
}
