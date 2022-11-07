<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\CalculateController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return Inertia::render("Welcome");
 })->name('/');

Route::get('home', [HomeController::class, 'index'])->name('home');

// Route::get('home', function () {
//     return Inertia::render("Home");
//  })->name('home');

// Route::get('calculation', function () {
//     return Inertia::render("Calculation");
//  })->name('calculation');

Route::get('calculation', [CalculateController::class, 'index'])->name('calculation');


require __DIR__.'/auth.php';

 