<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::create([
            'name'     => 'ahmed',
            'email'    => 'ahmed@gmail.com',
            'password' => bcrypt(123456)
        ]);

        //ATTACH ROLE
        $user->attachRole('user');
    }
}
