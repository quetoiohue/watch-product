<?php

use App\ProductHistories;
use Illuminate\Database\Seeder;

class ProductHistoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(ProductHistories::class, 50)->create();
    }
}
