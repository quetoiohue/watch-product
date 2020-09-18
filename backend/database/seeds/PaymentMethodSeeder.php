<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('payment_method')->insert([
            'key' => 'card',
            'name' => 'card'
        ]);

        DB::table('payment_method')->insert([
            'key' => 'alipay',
            'name' => 'alipay'
        ]);
    }
}
