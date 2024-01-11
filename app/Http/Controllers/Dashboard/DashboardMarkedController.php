<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardMarkedController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Marked', [
            'showListed' => Auth::user()->host()->exists(),
            'marks' => Auth::user()->marks()->with('apartment.host.user')->get(),
        ]);
    }
}
