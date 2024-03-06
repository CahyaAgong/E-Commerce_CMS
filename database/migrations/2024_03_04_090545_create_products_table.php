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
        Schema::create('ecm_products', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique()->default(DB::raw('UUID()'));
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('stock');
            $table->text('photo');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ecm_products');
    }
};
