<?php

use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\Dashboard\DashboardListedController;
use App\Http\Controllers\Dashboard\DashboardMarkedController;
use App\Http\Controllers\Dashboard\DashboardRentedController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\RentStatusController;
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
Route::apiResource('apartments.rents', RentController::class)->shallow();
Route::apiResource('apartments.marks', MarkController::class)->only(['store', 'destroy'])->shallow();

Route::put('rents/{rent}/status', RentStatusController::class)->name('rents.status')->middleware('auth');

Route::prefix('dashboard')->name('dashboard.')->middleware(['auth'])->group(function () {
    Route::get('listed', DashboardListedController::class)->name('listed');
    Route::get('rented', DashboardRentedController::class)->name('rented');
    Route::get('marked', DashboardMarkedController::class)->name('marked');
});

require __DIR__.'/auth.php';
