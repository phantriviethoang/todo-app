<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate
        $fields = $request->validate(
            [
                'title' => 'required',
            ],
            [
                'title.required' => 'Title không được để trống'
            ]
        );

        // action
        $todos = Todo::create($fields);

        // return
        return response()->json($todos, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        // validate
        $fields = $request->validate([
            'title' => 'required',
            'completed' => 'required'
        ]);

        // action
        $todo->update($fields);

        // return
        return response()->json($todo);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
    }
}
