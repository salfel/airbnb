<?php

namespace App\Http\Controllers;

use App\Models\Apartment;
use App\Models\Mark;
use Illuminate\Support\Facades\Auth;

class MarkController extends Controller
{
    public function store(Apartment $apartment)
    {
        $this->authorize('create', Mark::class);

        Mark::create([
            'apartment_id' => $apartment->id,
            'user_id' => Auth::id(),
        ]);

        return redirect()->back();
    }

    public function destroy(Mark $mark)
    {
        $this->authorize('delete', $mark);

        $mark->delete();

        return redirect()->back();
    }
}
