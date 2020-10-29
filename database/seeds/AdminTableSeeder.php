<?php

use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = \App\User::create([
            'name'     => 'admin',
            'email'    => 'admin@test.com',
            'password' => bcrypt(123456)
        ]);

        //ATTACH ROLE
        $admin->attachRole('admin');
    }
}
