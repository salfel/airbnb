<?php

use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\DashboardRentalsController;
use App\Http\Controllers\DashboardRentedController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ApartmentController::class, 'index'])->name('home');
Route::resource('apartments', ApartmentController::class)->except(['index']);
Route::apiResource('apartments.reviews', ReviewController::class)->shallow();
Route::apiResource('apartments.rents', RentController::class);

Route::get('dashboard/rentals', DashboardRentalsController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard.rentals');

Route::get('dashboard/rented', DashboardRentedController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard.rented');

Route::get('dashboard', fn () => redirect()->route('dashboard.rentals'))->name('dashboard');

require __DIR__.'/auth.php';
