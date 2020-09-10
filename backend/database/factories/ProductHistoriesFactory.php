<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ProductHistories;
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

$factory->define(ProductHistories::class, function (Faker $faker) {
    $created = date('Y-m-d H:i:s', mt_rand(time() - 86400 * 7, time()));

    return [
        'product_id'=> $faker->randomElement(range(1,50)),
        'price' => $faker->randomFloat($min = 100000, $max = 10000000),
        'created_at' => $created,
    ];
});
