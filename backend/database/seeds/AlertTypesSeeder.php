<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlertTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('alert_types')->insert([
            'point_charge' => 0,
            'name' => 'email',
        ]);

        DB::table('alert_types')->insert([
            'point_charge' => 1,
            'name' => 'phone call',
        ]);

        DB::table('alert_types')->insert([
            'point_charge' => 1,
            'name' => 'sms',
        ]);
    }
}
