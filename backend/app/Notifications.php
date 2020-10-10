<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    protected $table = 'notifications';

    protected $fillable = [
        'id',
        'product_id',
        'text',
        'status',
        'created_at'
    ];

    protected $appends = ['product'];

    public $timestamps = false;
    
    public function getProductAttribute() {
        return $this->belongsTo('App\Products', 'product_id')->first();
    }
}
