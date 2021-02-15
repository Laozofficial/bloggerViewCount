@extends('layouts.app')

@include('partials.nav')

@section('content')
<h3>NOTE: <BR><BR>


   as soon as you clicked the read more button from the previous page , i checked your session , and created a relationshiop between the post and your session , and i put that on a post_counts table , so i always check , once i see that you have viewed that post already , i just ignore and if not then i add the count .....
</h3>
    <div class="card">
        <div class="card-header">
            Add Posts
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
          let slug = "{{ $slug }}"
        new Vue({
            el:'#app',
            data:{
                post:{},
                img_src: img_src
            },
            mounted(){
                this.getSinglePost()
            },
            methods:{
                getSinglePost(){
                    axios.get('get-single-post/'+slug)
                        .then((response) => {
                            console.log(response);
                            this.post = response.data.post;
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong')
                        })
                }
            }
        })
    </script>
@endsection
