<?php

use App\Http\Controllers\JournalController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/journals', [JournalController::class, 'index'])->name('journals.index');
    Route::get('/journals/create', [JournalController::class, 'create'])->name('journals.create');
    Route::post('/journals', [JournalController::class, 'store'])->name('journals.store');
    Route::get('/journals/{id}/edit',[JournalController::class,'edit'])->name('journals.edit');
    Route::put('/journals/{id}',[JournalController::class,'update'])->name('journals.update');
    Route::delete('/journals/{id}',[JournalController::class,'destroy'])->name('journals.destroy');

    // Route::resource('journals',JournalController::class);


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
