<?php

namespace Tests\Feature;

use App\Models\Applicant;
use App\Models\Training;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TrainingSystemTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that public users can view the homepage with trainings.
     */
    public function test_public_can_view_homepage_with_trainings(): void
    {
        Training::factory()->active()->create([
            'title' => 'Web Development Bootcamp',
            'start_date' => now()->addDays(30),
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('trainings', 1)
                ->where('trainings.0.title', 'Web Development Bootcamp')
        );
    }

    /**
     * Test that training system components work.
     */
    public function test_training_system_components(): void
    {
        // Test that models can be created
        $training = Training::factory()->create([
            'title' => 'Test Training',
            'capacity' => 50,
            'enrolled_count' => 0,
        ]);
        
        $this->assertDatabaseHas('trainings', [
            'title' => 'Test Training',
            'capacity' => 50,
        ]);

        $applicant = Applicant::factory()->create([
            'training_id' => $training->id,
            'full_name' => 'Test Applicant',
        ]);
        
        $this->assertDatabaseHas('applicants', [
            'training_id' => $training->id,
            'full_name' => 'Test Applicant',
        ]);
    }

    /**
     * Test that admin can view dashboard.
     */
    public function test_admin_can_view_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboard')
                ->has('stats')
        );
    }

    /**
     * Test that admin can create training.
     */
    public function test_admin_can_create_training(): void
    {
        $admin = User::factory()->admin()->create();

        $trainingData = [
            'title' => 'Digital Marketing Mastery',
            'description' => 'Learn comprehensive digital marketing strategies.',
            'start_date' => now()->addDays(30)->format('Y-m-d'),
            'end_date' => now()->addDays(35)->format('Y-m-d'),
            'location' => 'Lagos, Nigeria',
            'capacity' => 50,
            'price' => 150000,
            'status' => 'active',
        ];

        $response = $this->actingAs($admin)->post('/trainings', $trainingData);

        $response->assertRedirect();
        $this->assertDatabaseHas('trainings', [
            'title' => 'Digital Marketing Mastery',
            'capacity' => 50,
        ]);
    }

    /**
     * Test that admin can export applicant data.
     */
    public function test_admin_can_export_applicant_data(): void
    {
        $admin = User::factory()->admin()->create();
        Applicant::factory(3)->create();

        $response = $this->actingAs($admin)->get('/export-applicants');

        $response->assertStatus(200);
        $response->assertHeader('content-type', 'text/csv; charset=UTF-8');
        $response->assertHeader('content-disposition', 'attachment; filename="applicants.csv"');
    }

    /**
     * Test that non-admin users cannot access admin routes.
     */
    public function test_non_admin_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create(['role' => 'user']);

        $response = $this->actingAs($user)->get('/trainings');
        $response->assertStatus(403);

        $response = $this->actingAs($user)->get('/applicants');
        $response->assertStatus(403);
    }
}