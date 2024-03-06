<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $table = 'ecm_orders';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable =  [
        'id',
        'user_id',
        'code',
        'order_date',
        'amount',
        'status',
        'note',
        'snap_token',
        'payment_status',
        'is_active',
    ];

    public function orderDetails(): hasMany
    {
        return $this->hasMany(OrderDetails::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class, 'order_id');
    }
}
