<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', 'ApiTokenController@create');
Route::post('/login', 'ApiTokenController@login');
Route::post('/refresh', 'ApiTokenController@update');
Route::get('/logout', 'ApiTokenController@logout');
Route::get('/me', 'ApiTokenController@me');