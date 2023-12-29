<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApartmentRequest;
use App\Models\Apartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    public function index()
    {
        return Inertia::render('Home', [
            'apartments' => Apartment::latest()->paginate(12)
        ]);
    }

    public function show(Apartment $apartment, Request $request)
    {
        return Inertia::render('Apartment/Show', [
            'apartment' => fn() => Apartment::with(['host.user' => fn($user) => Log::info('test', [$user])])->withCount('reviews')->findOrFail($apartment->id),
            'reviews' => $apartment->reviews()->with('user')->take($request->get('page', 1) * 6)->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Apartment/Create');
    }

    public function store(ApartmentRequest $request)
    {
        $this->authorize('create', Apartment::class);

        return Apartment::create($request->validated());
    }

    public function edit(Apartment $apartment)
    {
        $this->authorize('update', $apartment);

        return Inertia::render('Apartment/Edit');
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
