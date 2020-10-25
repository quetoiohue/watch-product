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
    "currency",
    "actual_price",
    "old_price",
    "discount",
    "inventory_status"
];

  protected $appends = ['cheapest_price', 'initial_price'];
  
  public function user() {
    return $this->belongsTo('App\User', 'user_id');
  }

  public function productHistories() {
    return $this->hasMany('App\ProductHistories', 'product_id', 'id');
  }

  public function productAlerts() {
    return $this->hasMany('App\ProductAlerts', 'product_id', 'id');
  }

  public function productNotifications() {
    return $this->hasMany('App\Notifications', 'product_id', 'id')->orderBy('created_at', 'desc');
  }

  public function getCurrentPriceAttribute()
  {
    $currentPrice = $this->attributes['actual_price'];
    return $currentPrice;
  }

  public function getCheapestPriceAttribute()
  {
    $cheapestPrice = $this->productHistories()->min('price');

    if (!$cheapestPrice) {
      return $this->getCurrentPriceAttribute();
    }
    return $cheapestPrice < $this->getCurrentPriceAttribute() 
    ? $cheapestPrice : $this->getCurrentPriceAttribute();
  }

  public function getInitialPriceAttribute()
  {
    $initialId = $this->productHistories()->min('id');

    if (!$initialId) {
      return $this->getCurrentPriceAttribute();
    }
    $initialPrice = $this->productHistories()->select('price')->where('id', $initialId)->first();
    return $initialPrice['price'];
  }
}
