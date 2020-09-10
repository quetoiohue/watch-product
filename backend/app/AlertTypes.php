<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlertTypes extends Model
{
    //
    protected $table = 'alert_types';

    protected $fillable = [
        'id',
        'name',
        'point_charge',
    ];

    public function productAlerts() {
        return $this->belongsToMany('App\ProductAlerts', 'alert_type_id', 'id');
    }
}
