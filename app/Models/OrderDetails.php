<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Product;
use App\Models\Order;

class OrderDetails extends Model
{
    use HasFactory;

    protected $table = 'ecm_order_details';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable =  [
        'id',
        'order_id',
        'product_id',
        'name',
        'price',
        'quantity'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
