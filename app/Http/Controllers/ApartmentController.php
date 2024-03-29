<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApartmentRequest;
use App\Models\Apartment;
use App\Models\Host;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $apartments = $request->has('search') ? Apartment::search($request->get('search')) : Apartment::latest();

        return Inertia::render('Home', [
            'apartments' => $apartments->when($request->has('minPrice'),
                fn (Builder $query) => $query->where('price', '>',
                    intval($request->get('minPrice'))))
                ->when($request->has('maxPrice'),
                    fn (Builder $query) => $query->where('price', '<',
                        intval($request->get('maxPrice'))))
                ->when($request->has('city'),
                    fn (Builder $query) => $query->where('city', $request->get('city')))
                ->when($request->has('country'),
                    fn (Builder $query) => $query->where('country', $request->get('country')))
                ->when($request->has('attributes'), fn (Builder $query) => $query->where(function (Builder $query) use ($request) {
                    foreach (explode(',', $request->get('attributes')) as $attribute) {
                        $query->whereJsonContains('attributes', $attribute);

                    }
                }))
                ->when($request->has('rating'),
                    fn (Builder $query) => $query->withAvg('reviews', 'stars')->having('reviews_avg_stars', '>=', $request->get('rating')))
                ->paginate(12)->withQueryString(),
        ]);
    }

    public function show(Apartment $apartment, Request $request)
    {
        return Inertia::render('Apartment/Show', [
            'apartment' => fn () => Apartment::with(['host.user'])->withCount('reviews')->findOrFail($apartment->id),
            'reviews' => $apartment->reviews()->with('user')->take($request->get('page', 1) * 6)->latest()->get(),
            'mark' => $apartment->mark()->where('user_id', Auth::id())->first(),
            'stars' => $apartment->stars,
        ]);
    }

    public function create()
    {
        return Inertia::render('Apartment/Create');
    }

    public function store(ApartmentRequest $request)
    {
        $this->authorize('create', Apartment::class);

        $user = Auth::user();
        $host = $user->host ?? Host::create(['user_id' => $user->id]);

        $validated = $request->validated();
        $validated = [
            ...$validated,
            'images' => array_map(fn (string $image) => '/storage/'.Storage::disk('public')->putFile('apartments', $image), $validated['images']),
        ];

        $apartment = Apartment::create([
            'host_id' => $host->id,
            ...$validated,
        ]);

        return redirect()->route('apartments.show', $apartment);
    }

    public function edit(Apartment $apartment)
    {
        $this->authorize('update', $apartment);

        return Inertia::render('Apartment/Edit', [
            'apartment' => $apartment,
        ]);
    }

    public function update(ApartmentRequest $request, Apartment $apartment)
    {
        $this->authorize('update', $apartment);

        Storage::disk('public')->delete(array_map(fn (string $image) => str_replace('/storage/', '', $image), $apartment->images));

        $validated = $request->validated();

        $images = [];
        foreach ($apartment->images as $image) {
            if (! in_array($image, $validated['images'])) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $image));
            } else {
                $images[] = $image;
            }
        }

        $validated = [
            ...$validated,
            'images' => [
                ...$images,
                ...array_map(fn ($image) => '/storage/'.Storage::disk('public')->putFile('apartments', $image), array_filter($validated['images'], fn ($image) => ! is_string($image))),
            ],
        ];

        $apartment->update($validated);

        return to_route('apartments.show', $apartment);
    }

    public function destroy(Apartment $apartment)
    {
        $this->authorize('delete', $apartment);

        $apartment->delete();

        return redirect()->back();
    }
}
