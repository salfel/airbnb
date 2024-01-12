<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardRentedController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Rented', [
            'showListed' => Auth::user()->host()->exists(),
            'rents' => Auth::user()->rents()->with('apartment.host.user')->get(),
        ]);
    }
}
