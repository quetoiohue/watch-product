<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //
    protected $table = 'transaction';
    
    protected $fillable = ['id', 'user_id', 'package_type_id',
    'card_type', 'card_brand', 'description', 'created_at'];

    public function owner() {
        return $this->belongsTo('App\User');
    }

    public function packageType() {
        return $this->hasOne('App\PackageTypes');
    }
}
