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
                    intval($request->get('minPrice'))))->when($request->has('maxPrice'),
                        fn (Builder $query) => $query->where('price', '<',
                            intval($request->get('maxPrice'))))->when($request->has('country'),
                                fn (Builder $query) => $query->where('country', $request->get('country')))
                ->paginate(12),
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

        $validated = array_map(function ($value) {
            if (! is_array($value) || (! count($value) || ! ($value[0] instanceof \Illuminate\Http\UploadedFile))) {
                return $value ?? [];
            }

            return array_map(function ($image) {
                return '/storage/'.Storage::disk('public')->putFile('apartments', $image);
            }, $value);
        }, $request->validated());

        $apartment = Apartment::create([
            'host_id' => $host->id,
            ...$validated,
        ]);

        return redirect()->route('apartments.show', $apartment);
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

        return to_route('apartments.show', [$apartment->id]);
    }

    public function destroy(Apartment $apartment)
    {
        $this->authorize('delete', $apartment);

        $apartment->delete();

        return redirect()->back();
    }
}
