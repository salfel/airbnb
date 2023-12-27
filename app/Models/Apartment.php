<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'beds',
        'baths',
        'guests',
        'host_id'
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'images' => 'array'
    ];

    public function host(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
