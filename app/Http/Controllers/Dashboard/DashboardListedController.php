<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardListedController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard/Listed', [
            'showListed' => Auth::user()->host()->exists(),
            'rents' => Auth::user()->through('apartments')->has('rents')->with([
                'apartment', 'user',
            ])->orderByDesc('start')->get(),
            'apartments' => Auth::user()->apartments()->with('host.user')->whereDate('end', '>',
                Carbon::now())->orderBy('start')->get(),
        ]);
    }
}
