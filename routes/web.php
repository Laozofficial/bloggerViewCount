<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.index');
});


Route::get('addpost', function(){
    return view('pages.add-post');
});

Route::post('addpost', [PostController::class, 'add_post_to_db']);
Route::get('viewposts', function(){return view('pages.view-posts');});
Route::get('get-all-posts', [PostController::class, 'get_all_posts']);//this gets all the post and the relationships
Route::get('readmore/{slug}', [PostController::class, 'readmore']);//read more blog post
Route::get('get-single-post/{slug}', [PostController::class, 'get_single_Post']);//get single post with slug
Route::get('get-unique-users',[PostController::class, 'get_unique_users']);//get unique users
Route::get('users',function(){return view('pages.users');});//return users page
