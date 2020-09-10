<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PackageTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('package_types')->insert([
            'name' => 'pkg1',
            'currency' => 'USD',
            'points' => 10,
            'amount' => 10,
        ]);

        DB::table('package_types')->insert([
            'name' => 'pkg2',
            'currency' => 'USD',
            'points' => 20,
            'amount' => 15,
        ]);

        DB::table('package_types')->insert([
            'name' => 'pkg3',
            'currency' => 'USD',
            'points' => 30,
            'amount' => 20,
        ]);
    }
}
