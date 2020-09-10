<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ProductAlerts;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(ProductAlerts::class, function (Faker $faker) {
    
    return [
        'alert_type_id'=> $faker->randomElement(range(1,3)),
        'product_id'=> $faker->numberBetween($min=0, $max=50),
        'status' => $faker->boolean($chanceOfGettingTrue = 50)
    ];
});
