<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\ProductImages;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $table = 'ecm_products';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable =  [
        'id',
        'name',
        'description',
        'price',
        'stock',
        'photo',
        'is_active'
    ];

    public function productImages(): hasMany {
        return $this->hasMany(ProductImages::class);
    }

    public function orderDetails(): hasMany {
        return $this->hasMany(OrderDetail::class);
    }

}
