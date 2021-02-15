new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        messages: []
    },
    mounted() {
        this.getMessages();
    },
    methods: {
        getMessages() {
            let url = '/admin/get/all/messages';

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.messages = response.data.messages;
                    this.loading = false;
                    this.content = true;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        approve(id) {

            swal({
                    title: "Are you sure?",
                    text: "Once approved, it cannot be undone !",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        let url = '/admin/approve/message/' + id;


                        axios.get(url)
                            .then((response) => {
                                console.log(response);
                                swal("Poof! " + response.data.success, {
                                    icon: "success",
                                });
                                // toastr.success(response.data.success);
                                this.getMessages();
                            })
                            .catch((error) => {
                                console.log(error);
                                toastr.error('something went wrong');
                            });
                    }
                });



        }
    },
})
