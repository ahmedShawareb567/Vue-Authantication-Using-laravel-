<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //ADMIN
        \App\Models\Role::create([
            'name' => 'admin',
            'display_name' => 'admin',
            'description' => 'This is admin role'
        ]);

        //EDITOR
        \App\Models\Role::create([
            'name' => 'editor',
            'display_name' => 'editor',
            'description' => 'This is editor role'
        ]);

        //USER
        \App\Models\Role::create([
            'name' => 'user',
            'display_name' => 'user',
            'description' => 'This is editor role'
        ]);
    }
}
