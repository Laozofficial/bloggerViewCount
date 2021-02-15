@extends('layouts.app')

@include('partials.nav')

@section('content')
<h3>NOTE: <BR><BR>

    So based on the unique users visitors , i cannot screen based on Ip Address alone , cause more than one person can use a particular IP Address ,so what i have just done here is to query the session table , cause that's what i use to separate users and becuase there are no authentication system then i am restricted to the the user agent of the client
</h3>



    <div class="card">
        <div class="card-header">
            Unique Users
        </div>
        <div class="card-body">
            <div class="table-responsive">
    <div>
    <table class="table align-items-center">
        <thead class="thead-light">
            <tr>
                <th scope="col" class="sort" data-sort="name">Session Id</th>
                <th scope="col" class="sort" data-sort="budget">IP</th>
                <th scope="col" class="sort" data-sort="status">User Agent</th>
                <th scope="col" class="sort" data-sort="completion">Last Activity</th>
                {{--  <th scope="col"></th>  --}}
            </tr>
        </thead>
        <tbody class="list">

            <tr v-for="user in users">
                <td>@{{ user.id }}</td>
                <td>@{{ user.ip_address }}</td>
                <td>@{{ user.user_agent }}</td>
                <td>@{{ user.last_activity }}</td>
                {{--  <td>
                    <button class="btn btn-danger btn-sm" @click="deleteSession(user.id)">
                        <i class="fas fa-trash text-danger"></i> X
                    </button>
                </td>  --}}
            </tr>
        </tbody>
    </table>

        </div>
    </div>
@endsection

@section('script')
    <script>
        new Vue({
            el:'#app',
            data:{
                users:[]
            },
            mounted(){
                this.getUniqueUsers();
            },
            methods:{
                getUniqueUsers(){
                    axios.get('get-unique-users')
                        .then((response) => {
                            console.log(response);
                            this.users = response.data.sessions;
                        })
                        .catch((error) => {
                            console.log(error)
                            taostr.error('something went wrong');
                        })
                        .then(() => {
                        })
                },
                deleteSession(id){
                    axios.get('delete-session')
                        .then((response) => {
                            console.log(response);
                            toastr.error(response.data.success);
                            this.getUniqueUsers();
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
