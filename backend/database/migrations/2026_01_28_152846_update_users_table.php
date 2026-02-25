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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('person_id')->after('id')->constrained()->onDelete('cascade');
            $table->boolean('is_admin');

            $table->dropColumn('name');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('name');

            $table->dropForeign(['person_id']);
            $table->dropColumn('person_id');
            $table->dropColumn('is_admin');
        });
    }
};
