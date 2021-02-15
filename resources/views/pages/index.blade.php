@extends('layouts.app')

@include('partials.nav')

@section('content')
<h3>NOTE: <BR><BR>


    new posts can be added to the web app by clicking on the plus sign on the navbar , as you can see i ouput the blog post views but it does not work unless the read more button is clicked
</h3>
    <div class="card" v-for="post in posts">
        <div class="card-header">
            <div class="row">
                <div class="col-md-6">
                    @{{ post.title }}
                </div>
                <div class="col-md-6 text-right">
                    <button class="btn btn-primary btn-sm" @click="readMore(post.slug)">
                        <i class="fa fa-eye"></i> Read More
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
           <div class="row">
               <div class="col-md-3">
                <img :src="`${img_src + post.image}`" alt="" style="height: 200px; width:200px">
           </div>
           <div class="col-md-9">
                @{{ post.content.replace(/<\/?[^>]+(>|$)/g, "")  }}
           </div>
           </div>
        </div>
        <div class="card-footer">
            <i class="fa fa-eye"></i> @{{ post.post_views.length }}
        </div>
    </div>
@endsection

@section('script')
   <script>
        new Vue({
        el:'#app',
        data:{
            img_src:img_src,
            posts: []
        },
        mounted(){
            this.getAllPost();
        },
        methods: {
            getAllPost(){
                axios.get('/get-all-posts')
                    .then((response) => {
                        console.log(response)
                        this.posts = response.data.posts;
                    })
                    .catch((error) => {
                        console.log(error);
                        toastr.error('something went wrong');
                    })

            },
            readMore(slug){
                window.location.href = '/readmore/'+ slug
            }
        }
    })
   </script>
@endsection
