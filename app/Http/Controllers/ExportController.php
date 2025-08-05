<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Applicant;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    /**
     * Export applicants data to CSV.
     */
    public function index()
    {
        $applicants = Applicant::with('training')->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="applicants.csv"',
        ];

        return new StreamedResponse(function () use ($applicants) {
            $handle = fopen('php://output', 'w');
            
            // Add CSV headers
            fputcsv($handle, [
                'ID',
                'Full Name',
                'Email',
                'Phone',
                'Address',
                'Training',
                'Status',
                'Registered At'
            ]);

            // Add data
            foreach ($applicants as $applicant) {
                fputcsv($handle, [
                    $applicant->id,
                    $applicant->full_name,
                    $applicant->email,
                    $applicant->phone,
                    $applicant->address,
                    $applicant->training->title,
                    ucfirst($applicant->status),
                    $applicant->registered_at->format('Y-m-d H:i:s')
                ]);
            }

            fclose($handle);
        }, 200, $headers);
    }
}