<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'apartment_id',
        'start',
        'end',
        'status'
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function apartment(): BelongsTo
    {
        return $this->belongsTo(Apartment::class);
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: function (string $status) {
                if ($this->end->isPast()) {
                    return 'expired';
                }
                return $status;
            }
        );
    }
}
