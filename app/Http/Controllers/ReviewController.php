<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Apartment;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ReviewController extends Controller
{
    public function index(Apartment $apartment)
    {

    }

    public function store(Apartment $apartment, ReviewRequest $request)
    {
        $response = Gate::inspect('create', $apartment);

        if (!$response->allowed()) {
            return redirect()->back()->withErrors(['auth' => 'You have to be logged in to leave a review.']);
        }

        Review::create([
            'user_id' => Auth::id(),
            'apartment_id' => $apartment->id,
            ...$request->validated()
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Review $review)
    {
    }

    public function destroy(Review $review)
    {
    }
}
