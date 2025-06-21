<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Journal;

class JournalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Journal::truncate(); // Optional: clear existing data

        Journal::insert([
            [
                'user_id' => 1, // Assign to user ID 1
                'content' => 'Refactored authentication flow to reduce complexity 🔐',
                'tag' => 'jobscope',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
            [
                'user_id' => 1,
                'content' => 'Helped a teammate troubleshoot deployment issue 👥',
                'tag' => 'extra',
                'created_at' => now()->subDays(1)->addHours(2),
                'updated_at' => now()->subDays(1)->addHours(2),
            ],
            [
                'user_id' => 1,
                'content' => 'Watched a course on advanced React patterns 📚',
                'tag' => 'learning',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'user_id' => 1,
                'content' => 'Investigated flaky tests on staging pipeline 🚨',
                'tag' => 'blocker',
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
        ]);
    }
}
