<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTrainingRequest;
use App\Http\Requests\UpdateTrainingRequest;
use App\Models\Training;
use Inertia\Inertia;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trainings = Training::with('applicants')
            ->latest()
            ->paginate(10);
        
        return Inertia::render('trainings/index', [
            'trainings' => $trainings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('trainings/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTrainingRequest $request)
    {
        $training = Training::create($request->validated());

        return redirect()->route('trainings.show', $training)
            ->with('success', 'Training created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Training $training)
    {
        $training->load('applicants');
        
        return Inertia::render('trainings/show', [
            'training' => $training
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Training $training)
    {
        return Inertia::render('trainings/edit', [
            'training' => $training
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTrainingRequest $request, Training $training)
    {
        $training->update($request->validated());

        return redirect()->route('trainings.show', $training)
            ->with('success', 'Training updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Training $training)
    {
        $training->delete();

        return redirect()->route('trainings.index')
            ->with('success', 'Training deleted successfully.');
    }
}