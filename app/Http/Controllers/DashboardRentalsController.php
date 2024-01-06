<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardRentalsController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Rentals');
    }
}
