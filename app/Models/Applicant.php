<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Applicant
 *
 * @property int $id
 * @property int $training_id
 * @property string $full_name
 * @property string $email
 * @property string $phone
 * @property string $address
 * @property string $status
 * @property \Illuminate\Support\Carbon $registered_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Training $training
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant query()
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereTrainingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereRegisteredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Applicant pending()
 * @method static \Database\Factories\ApplicantFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Applicant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'training_id',
        'full_name',
        'email',
        'phone',
        'address',
        'status',
        'registered_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'registered_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'training_id' => 'integer',
    ];

    /**
     * Get the training that this applicant belongs to.
     */
    public function training(): BelongsTo
    {
        return $this->belongsTo(Training::class);
    }

    /**
     * Scope a query to only include pending applicants.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}