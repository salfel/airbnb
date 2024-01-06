<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardRentedController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Rented');
    }
}
