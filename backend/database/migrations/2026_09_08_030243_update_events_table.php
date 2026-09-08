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
        Schema::table('events', function (Blueprint $table) {

            $table->string('title')->after('id');

            $table->string('location')
                ->nullable()
                ->after('description');

            $table->string('type')
                ->default('General')
                ->after('location');

            $table->unsignedInteger('max_attendees')
                ->nullable()
                ->after('type');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
