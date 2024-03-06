<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImages extends Model
{
    use HasFactory;

    protected $table = 'ecm_product_images';

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable =  [
        'id',
        'product_id',
        'name',
        'url',
        'caption',
        'is_active'
    ];

    public function product(): BelongsTo {
        return $this->belongsTo(Product::class);
    }
}
