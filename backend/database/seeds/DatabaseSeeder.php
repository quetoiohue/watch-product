<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersSeeder::class,
            ProductsSeeder::class,
            ProductHistoriesSeeder::class,
            ProductAlertsSeeder::class,
            AlertTypesSeeder::class,
            PackageTypesSeeder::class,
            PaymentMethodSeeder::class,
        ]);
    }
}
