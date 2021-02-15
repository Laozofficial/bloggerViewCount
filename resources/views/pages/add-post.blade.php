@extends('layouts.app')

@include('partials.nav')

@section('content')
    <div class="card">
        <div class="card-header">
            Add Posts
        </div>
        <div class="card-body">
            <label>Title</label>
            <input type="text" class="form-control mb-3" v-model="title"/>

            <label for="image">Featured Image</label>
            <input type="file"  id="file" ref="file" v-on:change="handleFileUpload()" class="form-control mb-3"/>

            <textarea id="summernote" class="mb-4"></textarea>

            <button class="btn btn-primary" @click="validate">
                <i class="fa fa-plus"></i> save post
            </button>
        </div>

    </div>
@endsection

@section('script')
      <script>
        $(document).ready(function() {
          $('#summernote').summernote({
              placeholder: 'Add A New Post',
              tabsize: 2,
              height: 190
          });
        });

        new Vue({
            el:'#app',
            data:{
                title:'',
                content:'',
                image:'',
            },
            mounted(){
                this.greetings();
            },
            methods:{
                greetings(){
                    toastr.success('Welcome')
                },
                 handleFileUpload(){
                    this.image = this.$refs.file.files[0];
                },
                validate(){
                    this.content = $('#summernote').val();
                    if(this.title === '' || this.image === '' || this.content === ''){
                        toastr.error('some fields are empty');
                    }else{
                        this.savePost();
                    }
                },
                savePost(){
                    //swal.showLoading();
                    let url = '/addpost';

                    let fd = new FormData;
                    fd.append('title', this.title);
                    fd.append('image', this.image);
                    fd.append('content', this.content);

                    axios.post(url, fd)
                        .then((response) => {
                            console.log(response);
                            toastr.success('post has been saved successfully');
                            this.title = '',
                            this.content = '',
                            this.image = ''
                            swal('weldone', 'post has been saved successfully', 'error');
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong');
                        })
                        .then(() => {
                            swal.close();
                        });

                }
            }
        })
    </script>
@endsection
