<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Journal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JournalController extends Controller
{
    public function index()
    {
         $journals = Journal::where('user_id',Auth::id())
                                ->orderBy('created_at', 'desc')
                                ->get();

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

    public function edit(string $id)
    {
        $journal = Journal::find($id);

        // return Inertia::render('Journal/Edit',compact('journal'));
    } 

    public function update(Request $request, string $id)
    {
          $validated = $request->validate([
            'content' => 'required|string',
            'tag' => 'required|in:jobscope,extra,learning,blocker',
        ]);

        $journal = Journal::find($id);

        $journal->update([
            'content' => $validated['content'],
            'tag' => $validated['tag'],
        ]);

        // return redirect()->route('journals.index')->with('success', 'Journal entry updated!');
    }

    public function destroy(string $id)
    {
        $journal = Journal::find($id);

        $journal->delete();

        //return redirect()->route('journals.index')->with('success', 'Journal entry updated!');

    }

}
