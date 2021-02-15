<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="Autochase">
  <meta name="author" content="Ellison Corp">
  <title>{{ config('app.name') }} | admin</title>
  <link rel="icon" href="{{ asset('admin/assets/img/brand/favicon.png') }}" type="image/png">
   <link href="{{ asset('https://fonts.googleapis.com/css?family=Nunito:400,600,700') }}" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
  <link rel="stylesheet" href="{{ asset('admin/assets/vendor/nucleo/css/nucleo.css') }}" type="text/css">
  <link rel="stylesheet" href="{{ asset('admin/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css') }}" type="text/css">
  <!--CSS Vex -->
  <link rel="stylesheet" href="{{ asset('admin/assets/css/vex/vex.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/assets/css/vex/vex-theme-plain.css') }}" />
  <link rel="stylesheet" href="{{ asset('admin/assets/vendor/select2/dist/css/select2.min.css') }}">
  <!-- Argon CSS -->
  <link rel="stylesheet" href="{{ asset('admin/assets/css/argon.css?v=1.1.0') }}" type="text/css">
  <!-- toastr notification library -->
  <link rel="stylesheet" href="{{ asset('admin/assets/css/toastr.css') }}" type="text/css">
  <link rel="stylesheet" href="{{ asset('admin/assets/css/sweetalert2.min.css') }}" type="text/css">
  <link rel="stylesheet" href="{{ asset('https://unpkg.com/vue-select@latest/dist/vue-select.css') }}">


  <link href="{{ asset('https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css') }}" rel="stylesheet">



  <style>
    #login-card{
      /*background: rgba(0, 0, 0, 0.4);*/
      background-color: transparent !important;
      border: none;

    }

    /* @font-face { font-family: Proximanova; src: url('{{ asset('fonts/Proxima Nova Extra Condensed Light.otf') }}'); }
   @font-face { font-family: Proximanova; font-weight: bold; src: url('{{ asset('fonts/') }}');} */

     /* body,html,p,h1,h2,h3,h4,h5,h6,span,li,ul,button,a,code{
        font-family: 'Fira Code', monospace; !important;
        font-size: 0.9rem !important;
        font-weight: 500 !important;
      }*/


      body,html,p,h1,h2,h3,h4,h5,h6,span,li,ul,button,a,code,input,textarea{
        font-family: 'Nunito', sans-serif;
        font-size: 0.875rem !important;
        font-weight: 700 !important;
      }

      .large{
        font-size: 1.3rem !important;
      }

      .height-200{
        max-height: 200px;
        margin-bottom: 0.5em;
      }

      .whitespace-wrap{
        white-space: normal !important;
      }

  </style>
</head>

<body>

  <main id="app" class="container">
      @yield('content')
  </main>

  <!-- Core -->
  <script src="{{ asset('https://cdnjs.cloudflare.com/ajax/libs/three.js/96/three.min.js') }}"></script>
  <script src="{{ asset('admin/assets/vendor/jquery/dist/jquery.min.js') }}"></script>
  <script type="text/javascript" src="{{ asset('https://cdn.jsdelivr.net/momentjs/latest/moment.min.js') }}"></script>
  <script type="text/javascript" src="{{ asset('https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js') }}"></script>
  <script src="{{ asset('admin/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js') }}"></script>
  <script src="{{ asset('admin/assets/vendor/js-cookie/js.cookie.js') }}"></script>
  <script src="{{ asset('admin/assets/vendor/jquery.scrollbar/jquery.scrollbar.min.js') }}"></script>
  <script src="{{ asset('admin/assets/vendor/jquery-scroll-lock/dist/jquery-scrollLock.min.js') }}"></script>
  <!-- Optional JS -->
  {{--  <script src="{{ asset('admin/assets/vendor/onscreen/dist/on-screen.umd.min.js') }}"></script>  --}}
  <script src="{{ asset('admin/assets/vendor/select2/dist/js/select2.min.js') }}"></script>
  <script src="{{ asset('http://maps.googleapis.com/maps/api/js?key=AIzaSyDTjgRcORAhpXUIByrNGLCqCfIlWYiHWOA') }}"  async defer></script>
  <!-- Argon JS and other addons-->

  <script src="{{ asset('admin/assets/js/argon.js?v=1.1.0') }}" ></script>
   <script src="{{ asset('admin/assets/js/vue.js') }}"></script>
  <script src="{{ asset('https://unpkg.com/vue-select@latest') }}"></script>
  <script src="{{ asset('admin/assets/js/demo.min.js') }}"></script>
  <script src="{{ asset('admin/assets/js/axios.js') }}"></script>
  <script src="{{ asset('admin/assets/js/moment.js') }}"></script>
  <script src="{{ asset('admin/assets/js/vue-moment.js') }}"></script>
  <script src="{{ asset('admin/assets/js/toastr.js') }}"></script><!--for notifications -->
  <script src="{{ asset('admin/assets/js/sweetalert.js') }}"></script><!--for notifications -->
  <script src="{{ asset('admin/assets/vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js') }}"></script>
  <script src="{{ asset('admin/assets/js/vue-truncate.js') }}"></script>
       <!--  notification JS
  ============================================ -->
  <script src="{{ asset('admin/assets/js/notification/bootstrap-growl.min.js') }}"></script>
  <script src="{{ asset('admin/assets/js/notification/notification-active.js') }}"></script>
  <script src="{{ asset('admin/assets/js/vue-pagination.js') }}" ></script>
  <!-- Vex -->
  <script src="{{ asset('admin/assets/js/vex/vex.combined.min.js') }}"></script>
  <script src="{{ asset('https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js') }}" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="{{ asset('https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js') }}"></script>
  <script>
    const base_url = "{{ url('/') }}";
    vex.defaultOptions.className = 'vex-theme-plain'
    axios.defaults.baseURL = base_url;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = "{{ csrf_token() }}";
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      let img_src = `${base_url}/uploads/`;
  </script>
  @yield('script')
</body>
</html>
