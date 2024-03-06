<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;

class Role extends Model
{
    use HasFactory;

    protected $table = 'ecm_roles';

    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable =  [
        'id',
        'name',
    ];

    public function user(): hasMany {
        return $this->hasMany(User::class);
    }
}
