<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Training;
use App\Models\Applicant;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Display the public homepage with available trainings.
     */
    public function index()
    {
        $trainings = Training::active()
            ->where('start_date', '>', now())
            ->where('enrolled_count', '<', Training::raw('capacity'))
            ->orderBy('start_date')
            ->take(6)
            ->get();
        
        return Inertia::render('welcome', [
            'trainings' => $trainings
        ]);
    }

    /**
     * Display all available trainings.
     */
    public function show()
    {
        $trainings = Training::active()
            ->where('start_date', '>', now())
            ->orderBy('start_date')
            ->paginate(12);
        
        return Inertia::render('public/trainings', [
            'trainings' => $trainings
        ]);
    }

    /**
     * Display a specific training for public view.
     */
    public function edit(Training $training)
    {
        if ($training->status !== 'active' || $training->start_date <= now()) {
            abort(404);
        }
        
        return Inertia::render('public/training', [
            'training' => $training
        ]);
    }

    /**
     * Check registration status by email and training.
     */
    public function create(Request $request = null)
    {
        if ($request && $request->has('email')) {
            $request->validate([
                'email' => 'required|email',
                'training_id' => 'sometimes|exists:trainings,id'
            ]);

            $query = Applicant::with('training')
                ->where('email', $request->email);

            if ($request->training_id) {
                $query->where('training_id', $request->training_id);
            }

            $applications = $query->get();

            return Inertia::render('public/status', [
                'applications' => $applications,
                'email' => $request->email
            ]);
        }

        return Inertia::render('public/status');
    }
}