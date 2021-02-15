<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;
use App\Models\PostCount;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostController extends Controller
{

    public function add_post_to_db(Request $request)
    {
         $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'image' => 'required|image|max:500'
        ]);

        $post = new Post;
        $post->title = $request->get('title');
        $post->content = $request->get('content');
        $post->slug = Str::slug($request->get('title'), '-');
         if ($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension(); // you can also use file name
            $image = '-1-' .time() . '.' . $extension;
            $path = Env('PUBLIC_IMAGE_PATH');
            $uplaod = $file->move($path, $image);

            $post->image = $image;
        }
        $post->save();

        $response = [
            'success' => 'post has been saved Successfully'
        ];

        return response($response, 200);

    }

    public function get_all_posts()
    {
        $posts = Post::orderBy('id', 'desc')->with(['post_views'])->get();

        $response = [
            'posts' => $posts
        ];

        return response($response);
    }

    public function get_single_Post(Request $request, $slug)
    {
        $session_key = $request->session()->getId();//get the user session

        $post = Post::where('slug', $slug)->with(['post_views'])->first();

        $response = [
            'post' => $post
        ];

        $post_count_check = PostCount::where('session_id', $session_key)->where('post_id', $post->id)->count();  //check if the session already viewed that post

        // return $post_count_check;

        if($post_count_check > 0){
            return response($response);
        }

        $post_count = new PostCount;
        $post_count->post_id = $post->id;
        $post_count->session_id = $request->session()->getId();
        $post_count->url = $request->url();
        $post_count->ip = $request->ip();
        $post_count->agent = $request->header('User-Agent');
        $post_count->save();

        // return $post_count;

        $post = Post::where('slug', $slug)->with(['post_views'])->first();

        $response = [
            'post' => $post
        ];

        return response($response);
    }

    public function readmore($slug)
    {
        return view('pages.read-more',
                    ['slug' => $slug]
                );
    }

    public function get_unique_users(Request $request)
    {
        $session = DB::table('sessions')->get();

        $response = [
            'sessions' => $session
        ];

        return response($response);
    }
}
