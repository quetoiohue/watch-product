<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Illuminate\Support\Facades\DB;
use Stripe\Issuing\Transaction;

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

$factory->define(Transaction::class, function (Faker $faker) {
    return [
        'user_id' => $faker->randomElement(range(1,30)),
        'card_id' => $faker->randomElement(range(1,30)),
        'package_type_id' => $faker->randomElement(range(1,3)),
        'payment_method_id' => $faker->randomElement(range(1,2)),
        'description' => $faker->creditCardNumber(),        
    ];
});
