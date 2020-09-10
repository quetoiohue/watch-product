<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Products;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;

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

$factory->define(Products::class, function (Faker $faker) {
    $created = date('Y-m-d H:i:s', mt_rand(time() - 86400 * 7, time()));

    $productId = $faker->ean8();

    return [
        'user_id' => $faker->randomElement(range(1,30)),
        'link' => "https://tiki.vn/p$productId.html",
        'image' => $faker->unique()->safeEmail,
        'name' => $faker->name,
        'actual_price' => $faker->randomFloat(100000, 10000000), // password
        'old_price' => $faker->randomFloat(100000, 10000000),
        'discount' => $faker->randomFloat(0, 80),
        'quantity' => $faker->numberBetween(0, 20),
        'created_at' => $created,
    ];
});
