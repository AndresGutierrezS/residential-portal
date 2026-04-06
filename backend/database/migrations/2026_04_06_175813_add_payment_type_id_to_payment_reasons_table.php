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
        Schema::table('payment_reasons', function (Blueprint $table) {
            $table->foreignId('payment_type_id')
                  ->after('id')
                  ->constrained('payment_types')
                  ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('payment_reasons', function (Blueprint $table) {
            $table->dropForeign(['payment_type_id']);
            $table->dropColumn('payment_type_id');
        });
    }
};
