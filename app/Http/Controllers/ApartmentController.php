<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApartmentRequest;
use App\Models\Apartment;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Apartment::class);

        return Inertia::render('Home', [
            'apartments' => Apartment::paginate(12)
        ]);
    }

    public function store(ApartmentRequest $request)
    {
        $this->authorize('create', Apartment::class);

        return Apartment::create($request->validated());
    }

    public function show(Apartment $apartment)
    {
        $this->authorize('view', $apartment);

        return $apartment;
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
