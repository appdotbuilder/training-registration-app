<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicantRequest;
use App\Http\Requests\UpdateApplicantRequest;
use App\Models\Applicant;
use App\Models\Training;
use Inertia\Inertia;


class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $applicants = Applicant::with('training')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('applicants/index', [
            'applicants' => $applicants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $trainings = Training::active()
            ->where('start_date', '>', now())
            ->orderBy('start_date')
            ->get();
        
        return Inertia::render('applicants/create', [
            'trainings' => $trainings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApplicantRequest $request)
    {
        $training = Training::findOrFail($request->training_id);
        
        if ($training->is_full) {
            return back()->withErrors([
                'training_id' => 'This training is already full.'
            ]);
        }

        $applicant = Applicant::create([
            ...$request->validated(),
            'registered_at' => now(),
        ]);

        // Update enrolled count
        $training->increment('enrolled_count');

        return redirect()->route('applicants.show', $applicant)
            ->with('success', 'Registration submitted successfully. You will be notified of your status.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Applicant $applicant)
    {
        $applicant->load('training');
        
        return Inertia::render('applicants/show', [
            'applicant' => $applicant
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Applicant $applicant)
    {
        $applicant->load('training');
        
        return Inertia::render('applicants/edit', [
            'applicant' => $applicant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApplicantRequest $request, Applicant $applicant)
    {
        $applicant->update($request->validated());

        return redirect()->route('applicants.show', $applicant)
            ->with('success', 'Applicant updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Applicant $applicant)
    {
        $training = $applicant->training;
        $applicant->delete();
        
        // Update enrolled count
        $training->decrement('enrolled_count');

        return redirect()->route('applicants.index')
            ->with('success', 'Applicant deleted successfully.');
    }


}