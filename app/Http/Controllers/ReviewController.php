<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Apartment;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ReviewController extends Controller
{
    public function store(Apartment $apartment, ReviewRequest $request)
    {
        $response = Gate::inspect('create', Review::class);

        if (! $response->allowed()) {
            session()->flash('message', [
                'title' => 'Not authorized',
                'message' => 'Please login to post a review for this apartment',
                'action' => 'login',
                'type' => 'destructive',
            ]);

            return redirect()->back();
        }

        Review::create([
            'user_id' => Auth::id(),
            'apartment_id' => $apartment->id,
            ...$request->validated(),
        ]);

        return redirect()->back();
    }

    public function update(ReviewRequest $request, Review $review)
    {
        Gate::inspect('update', $review);

        $review->update($request->validated());

        return redirect()->back();
    }

    public function destroy(Review $review)
    {
        Gate::inspect('delete', $review);

        $review->delete();

        return redirect()->back();
    }
}
