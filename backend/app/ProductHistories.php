<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductHistories extends Model
{
    //
    protected $table = "product_histories";

    protected $fillable = [
        'product_id',
        "price",
        "created_at"
    ];
}
