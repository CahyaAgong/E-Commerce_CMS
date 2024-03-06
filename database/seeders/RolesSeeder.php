<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Role;
use Illuminate\Support\Str;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $uuid1 = Str::uuid();
        $uuid2 = Str::uuid();

        Role::create([
            'id' => $uuid1,
            'name' => "admin",
            'created_at' => now()
        ]);

        Role::create([
            'id' => $uuid2,
            'name' => "customer",
            'created_at' => now()
        ]);
    }
}
