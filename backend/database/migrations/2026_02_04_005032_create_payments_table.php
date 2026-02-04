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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apartment_id')->constrained()->onDelete('cascade');
            $table->decimal('amount');
            $table->foreignId('payment_type_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->foreignId('payment_reason_id')->constrained()->onDelete('cascade');
            $table->string('description');
            $table->string('receipt');
            $table->boolean('is_paid');
            $table->foreignId('report_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
