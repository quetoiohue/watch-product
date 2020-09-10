<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PackageTypes extends Model
{
    //
    protected $table = 'package_types';

    protected $fillable = [
        'id',
        'name',
        'points',
        'currency',
        'amount'
    ];
}
