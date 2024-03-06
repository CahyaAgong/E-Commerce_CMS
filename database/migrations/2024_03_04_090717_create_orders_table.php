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
        Schema::create('ecm_orders', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique()->default(DB::raw('UUID()'));
            $table->foreignUuid('user_id')->nullable();
            $table->string('code');
            $table->dateTime('order_date');
            $table->decimal('amount', 10, 2);
            // $table->double('amount')->default(0);
            $table->text('note')->nullable();
            $table->string('snap_token')->nullable();
            $table->integer('status');
            $table->string('payment_status')->default('pending');
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ecm_orders');
    }
};
