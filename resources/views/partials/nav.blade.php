<nav class="navbar navbar-horizontal navbar-expand-lg navbar-dark bg-default mb-5">
    <div class="container">
        <a class="navbar-brand" href="/">Blog Views Count</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-default">
            <div class="navbar-collapse-header">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <a href="/">
                            <img src="../../assets/img/brand/blue.png">
                        </a>
                    </div>
                    <div class="col-6 collapse-close">
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false" aria-label="Toggle navigation">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>

            <ul class="navbar-nav ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="/users">
                        <i class="fa fa-users"></i>
                        <span class="nav-link-inner--text d-lg-none">Users</span>
                    </a>
                </li>
                {{--  <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="/viewposts">
                        <i class="fa fa-eye"></i>
                        <span class="nav-link-inner--text d-lg-none">Vie Posts</span>
                    </a>
                </li>  --}}
                 <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="/addpost">
                        <i class="fa fa-plus text-white"></i>
                        <span class="nav-link-inner--text d-lg-none">Add Post</span>
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link nav-link-icon" href="#" id="navbar-default_dropdown_1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ni ni-settings-gear-65"></i>
                        <span class="nav-link-inner--text d-lg-none">Settings</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</nav>
