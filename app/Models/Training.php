<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Training
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property string $location
 * @property int $capacity
 * @property int $enrolled_count
 * @property float $price
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Applicant[] $applicants
 * @property-read int|null $applicants_count
 * @property-read bool $is_full
 * @property-read int $available_spots
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Training newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Training newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Training query()
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereEnrolledCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Training active()
 * @method static \Database\Factories\TrainingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Training extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'location',
        'capacity',
        'enrolled_count',
        'price',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'price' => 'decimal:2',
        'capacity' => 'integer',
        'enrolled_count' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all applicants for this training.
     */
    public function applicants(): HasMany
    {
        return $this->hasMany(Applicant::class);
    }

    /**
     * Scope a query to only include active trainings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Check if the training is full.
     *
     * @return bool
     */
    public function getIsFullAttribute(): bool
    {
        return $this->enrolled_count >= $this->capacity;
    }

    /**
     * Get the available spots.
     *
     * @return int
     */
    public function getAvailableSpotsAttribute(): int
    {
        return max(0, $this->capacity - $this->enrolled_count);
    }
}