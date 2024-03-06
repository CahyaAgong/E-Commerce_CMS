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
        Schema::create('ecm_order_details', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique()->default(DB::raw('UUID()'));
            $table->foreignUuid('order_id')->nullable();
            $table->foreignUuid('product_id')->nullable();
            $table->string('name')->nullable();
            // $table->double('price')->default(0);
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ecm_order_details');
    }
};
