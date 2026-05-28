<?php

use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// get all todos
Route::get('/todos', [TodoController::class, 'index']);

// get single todo
// Route::get('/todos/{todo}', [TodoController::class, 'show']);

// create todo
Route::post('/todos', [TodoController::class, 'store']);

// update todo
Route::patch('/todos/{todo}', [TodoController::class, 'update']);

// delete todo
Route::delete('/todos/{todo}', [TodoController::class, 'destroy']);

// Route::apiResource('todos', TodoController::class);
