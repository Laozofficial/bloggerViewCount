new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        user: {}
    },
    mounted() {
        this.getUser();
    },
    methods: {
        deduct_wallet(id){
            swal("Debit wallet :", {
                content: "input",
              })
              .then((value) => {
                let url = '/admin/debit-user/'+ id;
                axios.post(url , {debit_amount : `${value}`})
                    .then((response) => {
                        console.log(response);
                        if(response.data.success){
                            swal(response.data.success, {
                                icon: "success",
                              });
                        }
                        if(response.data.error){ 
                            swal(response.data.error, {
                                icon: "error",
                              });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        toastr.error('something went wrong');
                    })
                    .then(() => {
                        this.getUser();
                    });
              });
        },
        fund_wallet(id){
            swal("Fund wallet with how much :", {
                content: "input",
              })
              .then((value) => {
                if(`${value}`){
                let url = '/admin/fund-user/'+ id;
                axios.post(url , {fund_amount : `${value}`})
                    .then((response) => {
                        console.log(response);
                        swal(response.data.success, {
                            icon: "success",
                          });
                          this.getUser();
                    })
                    .catch((error) => {
                        console.log(error);
                        // toastr.error('something went wrong');
                    })
                    .then(() => {
                        this.getUser();
                    });
                }
              });
        },
        restore_user(id){
            swal({
                title: "Are you sure?",
                text: "Once Restored , the user will be able to login to the system !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    let url = '/admin/restore/user/'+id;

                    axios.get(url)
                        .then((response) => {
                            swal("Poof!" + response.data.success, {
                                icon: "success",
                              });
                              this.getUser();
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong');
                        })
                } 
              });
        },
        ban_user(id){
            swal({
                title: "Are you sure?",
                text: "Once Banned , the user will not be able to login to the system !",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    let url = '/admin/ban/user/'+id;

                    axios.get(url)
                        .then((response) => {
                            swal("Poof!" + response.data.success, {
                                icon: "success",
                              });
                              window.location.href = '/admin/users';
                              this.getUser();
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong');
                        })
                } 
              });
        },
        getUser() {
            let url = '/admin/fetch/single/user/' + id;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.user = response.data.user;
                    this.loading = false;
                    this.content = true;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error("something went wrong");
                });
        },
        getWorkshopDetails(id) {
            window.location.href = '/admin/get/workshop/details/' + id;
        }
    },
})
