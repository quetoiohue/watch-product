<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    //
   protected $table = 'products';
   
   protected $fillable = [
    'user_id',
    "link", 
    "image",
    "name",
    "actual_price",
    "old_price",
    "discount",
    "quantity"
];

  public function user() {
    return $this->belongsTo('App\User', 'user_id');
  }

  public function productHistories() {
    return $this->hasMany('App\ProductHistories', 'product_id', 'id');
  }

  public function productAlerts() {
    return $this->hasMany('App\ProductAlerts', 'product_id', 'id');
  }
}
