<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Dev user. Login with email: test@example.com, password: password123
        User::factory()->create([
            'id' => 1,
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'), // password: password123
        ]);


        // seed journals
        $this->call([
            JournalSeeder::class,
        ]);
    }
}
