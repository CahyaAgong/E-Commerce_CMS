<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();

        $adminRole = Role::where('name', 'admin')->first();
        $customerRole = Role::where('name', 'customer')->first();

        User::create([
            'id' => $uuid1,
            'role_id' => $adminRole->id,
            'name' => $adminRole->name,
            'email' => $adminRole->name . '@mail.com',
            'password' => Hash::make('12341234')
        ]);

        User::create([
            'id' => $uuid2,
            'role_id' => $customerRole->id,
            'name' => $customerRole->name,
            'email' => $customerRole->name . '@mail.com',
            'password' => Hash::make('12341234')
        ]);
    }
}
