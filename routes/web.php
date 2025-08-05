<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/trainings', [PublicController::class, 'show'])->name('public.trainings');
Route::get('/training/{training}', [PublicController::class, 'edit'])->name('public.training');
Route::get('/register', [ApplicantController::class, 'create'])->name('register.training');
Route::post('/register', [ApplicantController::class, 'store'])->name('register.store');
Route::get('/status', [PublicController::class, 'create'])->name('check.status');
Route::post('/status', [PublicController::class, 'create'])->name('check.status.post');

// Admin routes (requires authentication)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user->isAdmin()) {
            $totalTrainings = \App\Models\Training::count();
            $totalApplicants = \App\Models\Applicant::count();
            $pendingApplicants = \App\Models\Applicant::where('status', 'pending')->count();
            $upcomingTrainings = \App\Models\Training::active()
                ->where('start_date', '>', now())
                ->count();
            
            return Inertia::render('dashboard', [
                'stats' => [
                    'totalTrainings' => $totalTrainings,
                    'totalApplicants' => $totalApplicants,
                    'pendingApplicants' => $pendingApplicants,
                    'upcomingTrainings' => $upcomingTrainings,
                ]
            ]);
        }
        
        return redirect()->route('home');
    })->name('dashboard');
    
    // Admin-only routes
    Route::middleware([\App\Http\Middleware\AdminMiddleware::class])->group(function () {
        Route::resource('trainings', TrainingController::class);
        Route::resource('applicants', ApplicantController::class);
        Route::get('export-applicants', [\App\Http\Controllers\ExportController::class, 'index'])->name('applicants.export');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
