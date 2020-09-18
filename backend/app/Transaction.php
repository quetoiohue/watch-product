<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //
    protected $table = 'transaction';
    
    protected $fillable = ['id', 'user_id', 'card_id', 'package_type_id',
     'payment_method_id', 'description', 'created_at'];

    public function paymentMethod() {
        return $this->hasOne('App\PaymentMethod');
    }

    public function owner() {
        return $this->belongsTo('App\User');
    }

    public function packageType() {
        return $this->hasOne('App\PackageTypes');
    }
}
