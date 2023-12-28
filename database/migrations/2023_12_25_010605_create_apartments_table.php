<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('host_id')->constrained();
            $table->string('city');
            $table->string('country');
            $table->integer('price');
            $table->string('title');
            $table->longText('description');
            $table->integer('beds');
            $table->integer('baths');
            $table->dateTime('start');
            $table->dateTime('end');
            $table->string('images')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
