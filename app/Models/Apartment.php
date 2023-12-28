<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = [
        'city',
        'country',
        'price',
        'start',
        'end',
        'images',
        'title',
        'description',
        'attributes',
        'beds',
        'baths',
        'host_id'
    ];

    protected $appends = [
        'stars'
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'images' => 'array',
        'attributes' => 'array'
    ];

    public function host(): BelongsTo
    {
        return $this->belongsTo(Host::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    protected function getStarsAttribute(): float
    {
        return round($this->reviews()->avg('stars'), 1);
    }
}
