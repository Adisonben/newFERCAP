<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\FercapGroupController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProtocolTypeController;
use App\Http\Controllers\RecognitionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/phpinfo', function () {
    return phpinfo();
});

Route::get('/testlogin', function () {
    dd("test");
})->name('testlogin');

// Route::redirect('/', 'dashboard');
Route::get('/', function () {
    if (Auth::user()->status === 3) {
        return redirect()->route('user.info.fill');
    } else {
        if (Auth::user()->userRole->codename === 'admin' || Auth::user()->userRole->codename === 'moderator') {
            return redirect()->route('dashboard');
        } else {
            return redirect()->route('welcome');
        }
    }
})->middleware(['auth'])->name('home');

// Error page
Route::get('/error-{status}', function ($status) {
    return Inertia::render('Errors/ErrorPage' , ['status' => $status ?? 500]);
})->name('page-error');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    Route::get('/welcome', [HomeController::class, 'welcome'])->name('welcome');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // User routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/user/{user_id}', [UserController::class, 'showUser'])->name('users.show');
    Route::delete('/users/{user_id}', [UserController::class, 'deleteUser'])->name('users.delete');
    Route::get('/users/toggle-status/{userId}', [UserController::class, 'toggleStatus'])->name('users.toggle.status');
    Route::get('/fill-more-info', [UserController::class, 'fillMoreInfo'])->name('user.info.fill');
    Route::post('/fill-more-info', [UserController::class, 'storeUserInfo'])->name('user.info.store');
    Route::patch('/fill-more-info', [UserController::class, 'updateUserInfo'])->name('user.info.update');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');

    // Protocol types routes
    Route::resource('protocol-types', ProtocolTypeController::class);
    Route::get('/protocol-types/toggle-status/{id}', [ProtocolTypeController::class, 'toggleStatus'])->name('protocol-types.toogle-status');

    // Fercap groups routes
    Route::resource('fercap-groups', FercapGroupController::class);
    Route::get('/fercap-groups/toggle-status/{id}', [FercapGroupController::class, 'toggleStatus'])->name('fercap-groups.toogle-status');

    // Recognitions routes
    Route::resource('recognitions', RecognitionController::class);
    Route::get('/recognitions/set-allow/{recognitionId}', [RecognitionController::class, 'setRecognitionAllow'])->name('recognitions.allow.set');
    Route::get('/recognitions/set-reject/{recognitionId}', [RecognitionController::class, 'setRecognitionReject'])->name('recognitions.reject.set');

    // Survey routes
    Route::resource('surveys', SurveyController::class);
    Route::get('/surveys/{survey}/team', [SurveyController::class, 'editSurveyTeam'])->name('surveys.team.edit');
    Route::post('/surveys/{surveyId}/add-team', [SurveyController::class, 'addSurveyTeam'])->name('surveys.add-team');
    Route::post('/surveys/save-team', [SurveyController::class, 'saveSurveyTeam'])->name('surveys.save-team');
    Route::delete('/surveys/{survey_id}/survey-team/member/{member_id}', [SurveyController::class, 'deleteSurveyTeamMember']);
    Route::get('/surveys/{survey_id}/discussion-room/{room_id}', [SurveyController::class, 'showDiscussionRoom'])->name('surveys.discussion');

    // Available survey
    Route::get('/available-survey', [SurveyController::class, 'availableSurvey'])->name('surveys.available');
    Route::get('/my-survey', [SurveyController::class, 'mySurvey']);
});

// API routes
Route::prefix('api')->middleware('auth')->group(function () {
    Route::get('/select-user-list', [ApiController::class, 'getSelectUser']);
    Route::get('/group-user-list/{id}', [ApiController::class, 'groupUserList']);
    Route::get('/countries', [ApiController::class, 'getCountries']);
    Route::get('/roles', [ApiController::class, 'getRoles']);
    Route::get('/protocol-types', [ApiController::class, 'getProtocolTypes']);
    Route::post('/upload-file', [ApiController::class, 'storeFile']);
    Route::delete('/delete-file/{id}', [ApiController::class, 'handleDeleteFile']);
    Route::get('/recognition-files/{rec_id}', [ApiController::class, 'getRecognitionFiles']);
    Route::get('/annual-progress-files/{rec_id}', [ApiController::class, 'getAnnualFiles']);
    Route::get('/download-file/{id}', [ApiController::class, 'downloadFile']);
    Route::get('/fercap-groups', [ApiController::class, 'getFercapGroups']);

    Route::get('/surveys', [ApiController::class, 'getSurveys']);
    Route::get('/survey/{state}/{id}', [ApiController::class, 'joinSurvey']);
    Route::get('/surveyor-list/{survey_id}', [ApiController::class, 'getSurveyorList']);
    Route::get('/survey-team/{survey_id}', [ApiController::class, 'getSurveyTeam']);
    Route::get('/survey-team-roles', [ApiController::class, 'getSurveyTeamRoles']);
    Route::get('/survey/{survey_id}/file-type/{room_type}', [ApiController::class, 'getSurveyFileFromType']);
    Route::get('/survey/{survey_id}/files/{room_type}', [ApiController::class, 'getSurveyFilesFromType']);

    Route::post('/store-message', [ApiController::class, 'storeMessage']);
    Route::get('/get-messages/{room_id}', [ApiController::class, 'getRoomMessages']);

    Route::post('/discussion-file/submit', [ApiController::class, 'submitDiscussionFile']);
    Route::get('/discussion-file/remove/{id}', [ApiController::class, 'removeDiscussionFile']);
    Route::get('/discussion-room/{roomId}/toggle-status/{setStatus}', [ApiController::class, 'toggleDiscussionRoomStatus']);
    Route::get('/discussion-file/submit/reject/{id}', [ApiController::class, 'rejectSubmitDiscussionFile']);
    Route::get('/discussion-file/submit/approve/{id}', [ApiController::class, 'approveSubmitDiscussionFile']);
    Route::post('/discussion-file/reject', [ApiController::class, 'rejectDiscussionFile']);
    Route::post('/survey/upload-files/{fileType}', [ApiController::class, 'uploadSurveyFiles']);

    Route::post('/recognition/upload-files', [ApiController::class, 'uploadRecognitionFiles']);

    Route::delete('/survey-file/delete/{surveyFileID}', [ApiController::class, 'deleteSurveyFile']);
    Route::delete('/recognition-file/delete/{recFileID}', [ApiController::class, 'deleteRecFile']);
});


require __DIR__.'/auth.php';
