<?php

namespace App\Http\Controllers;

use App\Http\Requests\RentRequest;
use App\Models\Rent;

class RentController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Rent::class);

        return Rent::all();
    }

    public function store(RentRequest $request)
    {
        $this->authorize('create', Rent::class);

        return Rent::create($request->validated());
    }

    public function show(Rent $rent)
    {
        $this->authorize('view', $rent);

        return $rent;
    }

    public function update(RentRequest $request, Rent $rent)
    {
        $this->authorize('update', $rent);

        $rent->update($request->validated());

        return $rent;
    }

    public function destroy(Rent $rent)
    {
        $this->authorize('delete', $rent);

        $rent->delete();

        return response()->json();
    }
}
