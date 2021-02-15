new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        booking: {},
        comments:[]
    },
    mounted() {
        this.getBooking();
    },
    methods: {
        getBooking() {
            let url = '/admin/fetch/single/booking/' + id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.booking = response.data.booking;
                    this.content = true;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        openChat(id){
            let url = '/workshop/get/service-booking/comments/'+id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    if(response.data.error){
                        toastr.error(response.data.error);
                    }else{
                        this.comments = response.data.comments;
                        console.log(this.comments.message);
                        $('#chatBox').modal('show');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
           
        },
        disable_chat(id){
            swal({
                title: "Are you sure?",
                text: "Once disabled, commuincation will be cut off between user and workshop!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    let url = '/admin/disable/chat/'+id;

                    axios.get(url)
                        .then((response) => {
                            console.log(response);
                            toastr.success(response.data.success); 
                            swal("Poof!" + response.data.success, {
                                icon: "success",
                            });
                            this.getBooking();
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong');
                        });
                }
              });  
        },
        enable_chat(id){
            swal({
                title: "Are you sure?",
                text: "Once enabled, commuincation will be turned on between user and workshop!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    let url = '/admin/enable/chat/'+id;

                    axios.get(url)
                        .then((response) => {
                            console.log(response);
                            toastr.success(response.data.success); 
                            swal("Poof!" + response.data.success, {
                                icon: "success",
                            });
                            this.getBooking();
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong');
                        });
                }
              }); 
        }
    },
});
