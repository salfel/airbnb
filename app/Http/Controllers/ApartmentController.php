<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApartmentRequest;
use App\Models\Apartment;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'apartments' => Apartment::latest()->paginate(12)
        ]);
    }

    public function store(ApartmentRequest $request)
    {
        $this->authorize('create', Apartment::class);

        return Apartment::create($request->validated());
    }

    public function show(int $apartment)
    {
        $apartment = Apartment::with(['host.user', 'reviews.user'])->withCount('reviews')->findOrFail($apartment);
        return Inertia::render('Apartment/Show', [
            'apartment' => $apartment,
        ]);
    }

    public function update(ApartmentRequest $request, Apartment $apartment)
    {
        $this->authorize('update', $apartment);

        $apartment->update($request->validated());

        return $apartment;
    }

    public function destroy(Apartment $apartment)
    {
        $this->authorize('delete', $apartment);

        $apartment->delete();

        return response()->json();
    }
}
