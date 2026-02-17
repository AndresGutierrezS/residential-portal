<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('people')->onDelete('cascade');
            $table->foreignId('receiver_id')->nullable()->constrained('people')->onDelete('cascade');
            $table->foreignId('apartment_from_id')->nullable()->constrained('apartments')->onDelete('cascade');
            $table->foreignId('apartment_to_id')->nullable()->constrained('apartments')->onDelete('cascade');
            $table->string('message');
            $table->timestamp('sent_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
