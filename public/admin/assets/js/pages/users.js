new Vue({
    el: '#app',
    data: {
        loading: true,
        content: false,
        users: [],
        page: 1,
        loading_users: false
    },
    mounted() {
        this.getUsers();
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
                        this.getUsers();
                    });
              });
        },
        fund_wallet(id){
            swal("Fund wallet with how much :", {
                content: "input",
              })
              .then((value) => {
                let url = '/admin/fund-user/'+ id;
                axios.post(url , {fund_amount : `${value}`})
                    .then((response) => {
                        console.log(response);
                        swal(response.data.success, {
                            icon: "success",
                          });
                    })
                    .catch((error) => {
                        console.log(error);
                        toastr.error('something went wrong');
                    })
                    .then(() => {
                        this.getUsers();
                    });
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
                              this.getUsers();
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
                              this.getUsers();
                        })
                        .catch((error) => {
                            console.log(error);
                            toastr.error('something went wrong');
                        })
                } 
              });
        },
        getUsers() {
            this.loading_users = true;
            let url = '/admin/get/all/users?page=' + this.page;

            axios.get(url)
                .then((response) => {
                    console.log(response);
                    this.users = response.data.users;
                    this.loading = false;
                    this.content = true;
                })
                .catch((error) => {
                    console.log(error);
                    toastr.error('something went wrong');
                });
        },
        pageChange(page) {
            if (this.page != page && page != 0) {
                this.page = page;
                this.getUsers();
            }
        },
        getUserDetails(id) {
            window.location.href = '/admin/get/single/user/' + id;
        }
    },
})
