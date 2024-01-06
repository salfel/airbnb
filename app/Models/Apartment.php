<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Apartment extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'city',
        'country',
        'price',
        'square_meters',
        'start',
        'end',
        'images',
        'title',
        'description',
        'attributes',
        'beds',
        'baths',
        'guests',
        'host_id',
    ];

    protected $appends = [
        'stars',
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'images' => 'array',
        'attributes' => 'array',
    ];

    public function searchableAs(): string
    {
        return 'apartments_index';
    }

    public function toSearchableArray(): array
    {
        return $this->only(['title', 'description', 'city', 'country', 'attributes']);
    }

    public function host(): BelongsTo
    {
        return $this->belongsTo(Host::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function marks(): HasMany
    {
        return $this->hasMany(Mark::class, 'apartment_id');
    }

    protected function getStarsAttribute(): float
    {
        return round($this->reviews()->avg('stars'), 1);
    }
}
