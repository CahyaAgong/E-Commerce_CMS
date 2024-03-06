<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $table = 'ecm_payment';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['order_id', 'amount', 'payment_method', 'status'];


    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
