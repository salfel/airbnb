<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Apartment;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Apartment $apartment)
    {

    }

    public function store(Apartment $apartment, ReviewRequest $request)
    {
        $this->authorize('create', Review::class);
    }

    public function update(Request $request, Review $review)
    {
    }

    public function destroy(Review $review)
    {
    }
}
