<?php

use App\Http\Controllers\ApartmentController;
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
Route::apiResource('apartments.reviews', ReviewController::class)->except(['show'])->shallow();
Route::apiResource('apartments.rents', RentController::class)->except(['index', 'show'])->shallow();

Route::get('/dashboard', function () {
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
