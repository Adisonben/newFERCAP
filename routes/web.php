<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\FercapGroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProtocolTypeController;
use App\Http\Controllers\RecognitionController;
use App\Http\Controllers\RecognitionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::redirect('/', 'dashboard');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/fill-more-info', [UserController::class, 'fillMoreInfo'])->name('user.info.fill');
    Route::post('/fill-more-info', [UserController::class, 'storeUserInfo'])->name('user.info.store');

    // Protocol types routes
    Route::resource('protocol-types', ProtocolTypeController::class);
    Route::get('/protocol-types/toggle-status/{id}', [ProtocolTypeController::class, 'toggleStatus'])->name('protocol-types.toogle-status');

    // Fercap groups routes
    Route::resource('fercap-groups', FercapGroupController::class);
    Route::get('/fercap-groups/toggle-status/{id}', [FercapGroupController::class, 'toggleStatus'])->name('fercap-groups.toogle-status');


    // Recognitions routes
    Route::resource('recognitions', RecognitionController::class);

    // Recognitions routes
    Route::resource('recognitions', RecognitionController::class);
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
});

// API routes
Route::prefix('api')->middleware('auth')->group(function () {
    Route::get('/select-user-list', [ApiController::class, 'getSelectUser']);
    Route::get('/group-user-list/{id}', [ApiController::class, 'groupUserList']);
    Route::get('/countries', [ApiController::class, 'getCountries']);
    Route::get('/countries', [ApiController::class, 'getCountries']);
    Route::get('/roles', [ApiController::class, 'getRoles']);
});


require __DIR__.'/auth.php';
