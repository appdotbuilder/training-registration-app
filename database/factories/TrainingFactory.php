<?php

namespace Database\Factories;

use App\Models\Training;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Training>
 */
class TrainingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Training>
     */
    protected $model = Training::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('now', '+6 months');
        $endDate = fake()->dateTimeBetween($startDate, $startDate->format('Y-m-d') . ' +30 days');
        
        return [
            'title' => fake()->randomElement([
                'Web Development Bootcamp',
                'Digital Marketing Mastery',
                'Data Analysis with Python',
                'Mobile App Development',
                'Cybersecurity Fundamentals',
                'UI/UX Design Workshop',
                'Project Management Certification',
                'Cloud Computing Essentials',
                'Machine Learning Basics',
                'E-commerce Business Setup'
            ]),
            'description' => fake()->paragraphs(3, true),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'location' => fake()->randomElement([
                'Lagos, Nigeria',
                'Abuja, Nigeria',
                'Port Harcourt, Nigeria',
                'Kano, Nigeria',
                'Ibadan, Nigeria',
                'Online Training'
            ]),
            'capacity' => fake()->numberBetween(20, 100),
            'enrolled_count' => fake()->numberBetween(0, 15),
            'price' => fake()->randomFloat(2, 50000, 500000),
            'status' => fake()->randomElement(['active', 'active', 'active', 'inactive']),
        ];
    }

    /**
     * Indicate that the training is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the training is full.
     */
    public function full(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'enrolled_count' => $attributes['capacity'],
            ];
        });
    }
}