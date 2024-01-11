<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardListedController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Listed', [
            'showListed' => Auth::user()->host()->exists(),
            'listed' => Auth::user()->through('apartments')->has('rents')->with([
                'apartment', 'user',
            ])->orderBy('start')->get(),
        ]);
    }
}
