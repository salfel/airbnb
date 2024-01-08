<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardRentalsController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Rentals', [
            'showRentals' => Auth::user()->host()->exists(),
            'rentals' => Auth::user()->through('apartments')->has('rents')->latest()->get(),
        ]);
    }
}
