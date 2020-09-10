<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductAlerts extends Model
{
    //
    protected $table = 'product_alerts';
    protected $fillable = [
        'id',
        'product_id',
        'alert_type_id',
        'status'
    ];

    public function product() {
        return $this->belongsTo('App\Products');
    }

    public function alertTypes() {
        return $this->belongsTo('App\AlertTypes');
    }
}
