<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Journal;

class JournalController extends Controller
{
    public function index()
    {
         $journals = Journal::orderBy('created_at', 'desc')->get();

        return Inertia::render('Journal/Index', [
            'journals' => $journals
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'tag' => 'required|in:jobscope,extra,learning,blocker',
        ]);

        Journal::create([
            'content' => $validated['content'],
            'tag' => $validated['tag'],
        ]);

        return redirect()->back()->with('success', 'Journal entry created!');
    }
}
